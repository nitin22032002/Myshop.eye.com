const express=require('express');
const router=express.Router();
const pool=require('./mysqlconnection')
const upload=require('./upload');
const fs=require('fs');
const { query } = require('./mysqlconnection');

router.post('/insertdata',upload.single('picture'),function(req,res){
    pool.query('insert into finalproduct (productid, colorid, size, price, offertype, offerprice, stock, discription, picture) values(?,?,?,?,?,?,?,?,?)',[req.body.productid,req.body.colorid,req.body.size,req.body.price,req.body.offertype,req.body.offerprice,req.body.stock,req.body.discription,req.file.filename],function(error,result){
        if(error){
            console.log(error);
            res.status(500).json(false);
        }
        else{
            res.status(200).json(true);
        }
    })
})
router.get('/getdata',function(req,res){
    pool.query('select p.*,(select colorname from colors where colorid=p.colorid) as colorname,(select productname from products where productid=p.productid) as productname from finalproduct p',function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({data:[]})
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/displayproductpicture',function(req,res){
    pool.query('select * from productpicture where finalproductid=?',[req.body.fpid],function(error,result){
       if(error){
           res.status(500).json([])
       }
       else{
        //    console.log(result)
           res.status(200).json(result)
       }
    })
})
router.post('/updateproductpicture',upload.single('picture'),function(req,res){
    var old=req.body.oldpicture
    var old=String(old).split("/")
    var old=old[old.length-1]
    try{
        fs.unlinkSync("public/images/"+old)
    }
    catch(e){
        console.log(e);
    }
    pool.query('update productpicture set image=? where pictureid=?',[req.file.filename,req.body.pid],function(err,result){
        if(err){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }

    })
})
router.post('/deleteproductpicture',function(req,res){
    var old=req.body.oldpicture
    var old=String(old).split("/")
    var old=old[old.length-1]
    try{
        fs.unlinkSync("public/images/"+old)
    }
    catch(e){
        console.log(e);
    }
    pool.query('delete from productpicture where pictureid=?',[req.body.pid],function(err,result){
        if(err){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }

    })
})
router.post('/deleteproduct',function(req,res){
    pool.query('delete from finalproduct where finalproductid=?',[req.body.id],function(err,result){
        if(err){
            console.log(err)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/checkexist',function(req,res){
    pool.query('select * from finalproduct where productid=? and colorid=? and size=?',[req.body.productid,req.body.colorid,req.body.size],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            if(result.length==1){
                res.status(200).json(false)
            }
            else{
            res.status(200).json(true)
        }}
    })
})
router.post('/updateimage',upload.single('picture'),function(req,res){
    var old=req.body.oldpicture
    var old=String(old).split("/")
    var old=old[old.length-1]
    try{
        fs.unlinkSync("public/images/"+old)
    }
    catch(e){
        console.log(e);
    }
    pool.query('update finalproduct set picture=? where finalproductid=?',[req.file.filename,req.body.id],function(err,result){
        if(err){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }

    })
})
router.post('/addpictures',upload.any(),function(req,res){
    querys='insert into productpicture (finalproductid,image) values ?'
    pool.query(querys,[req.files.map((item)=>[req.body.finalid,item.filename])],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(true)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/updatedata',function(req,res){
    pool.query('update finalproduct set colorid=?,size=?,stock=?,price=?,offerprice=?,offertype=?,discription=? where finalproductid=?',[req.body.colorid,req.body.size,req.body.stock,req.body.price,req.body.offerprice,req.body.offertype,req.body.discription,req.body.finalproductid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/getByProductId',function(req,res){
    console.log(req.body)
    pool.query('select f.*,(select colorname from colors where colorid=f.colorid) as colorname from finalproduct f where f.productid=? group by colorid',[req.body.productid],function(err,result){
        if(err){
            console.log(err)
            res.status(500).json([])
        }
        else{
            res.status(200).json(result);
        }
    })
})
router.post('/getPicByProductId',function(req,res){
    // console.log(req.body)
    pool.query('select * from productpicture where finalproductid=?',[req.body.productid],function(err,result){
        if(err){
            console.log(err)
            res.status(500).json([])
        }
        else{
         
            res.status(200).json(result  );
        }
    })
})
router.post('/similarproduct',function(req,res){
    pool.query('select * from products where productid!=? and categoryid=? and (frameid=? or shapeid=? or materialid=?)',[req.body.productid,req.body.categoryid,req.body.frameid,req.body.shapeid,req.body.materialid],function(err,result){
        if(err){
            console.log(err)
            res.status(500).json([])
        }
        else{
            
            res.status(200).json(result);
        }
    })
})
router.get('/homepictures',function(req,res){
    pool.query('select * from homepage order by position',function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({data:[]})
        }
        else{
            console.log(result)
            res.status(200).json({data:result})
        }
    })
})
router.post('/products',function(req,res){
    pool.query('select * from products where status=?',[req.body.status],async function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({data:[]})
        }
        else{
            for(let item of result){
                item['color']=await getData(item.productid)
                item['checked']=[item.color[0]]
                // a=Array.from(item.color).push(item)
                // console.log(a)
            }
            res.status(200).json({data:result})
        }
    })
})
async function getData(id){
        a=await new Promise((resolve,rejects)=>{pool.query('select f.*,(select colorname from colors where colorid=f.colorid) as colorname from finalproduct f where f.productid=? group by colorid',[id],(err,result)=>{
            if(err){
                rejects(err)
            }
            else{
                resolve(result)
            }
        })})
    return a;
}
module.exports=router;