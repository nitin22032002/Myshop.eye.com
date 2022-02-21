const express=require('express');
const router=express.Router();
const pool=require('./mysqlconnection')
const upload=require('./upload');
const fs=require('fs');
router.post('/insertdata',upload.single('picture'),function(req,res){
    pool.query('insert into products (productname, materialid, shapeid, frameid, categoryid, type, discription, picture,status,adv) values(?,?,?,?,?,?,?,?,?,?)',[req.body.productname,req.body.materialid,req.body.shapeid,req.body.frameid,req.body.categoryid,req.body.type,req.body.discription,req.file.filename,req.body.status,req.body.adv],function(error,result){
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
    pool.query('select p.*,(select materialname from materials where materialid=p.materialid) as materialname,(select shapename from shapes where shapeid=p.shapeid) as shapename,(select categoryname from categories where categoryid=p.categoryid) as categoryname,(select framename from frames where frameid=p.frameid) as framename from products p',function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({data:[]})
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/deleteproduct',function(req,res){
    pool.query('delete from products where productid=?',[req.body.id],function(err,result){
        if(err){
            console.log(err)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
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
    
    pool.query('update products set picture=? where productid=?',[req.file.filename,req.body.id],function(err,result){
        if(err){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }

    })
})
router.post('/updatedata',function(req,res){
    console.log(req.body)
    pool.query(`update products set productname='${req.body.productname}', frameid=${req.body.frameid},shapeid=${req.body.shapeid},categoryid=${req.body.categoryid},materialid=${req.body.materialid},discription='${req.body.discription}',type='${req.body.type}',status='${req.body.status}',adv='${req.body.adv}' where productid=${req.body.productid}`,function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
module.exports=router;