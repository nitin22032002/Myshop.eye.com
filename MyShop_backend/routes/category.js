var express=require('express')
var router=express.Router();
var pool=require('./mysqlconnection');
var upload=require('./upload');
var fs=require('fs')
router.post('/insertdata',upload.single('picture'),function(req,res){
    pool.query('insert into categories (categoryname,adpicture) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.get('/fetchcategory',function(req,res){
    pool.query('select * from categories',function(error,result){
        if(error){
            res.status(500).json({data:[]})
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/deletecategory',function(req,res){
    var a=String(req.body.img).split("/")
    try {
        fs.unlinkSync(`public/images/${a[a.length-1]}`)
    } catch (error) {
        console.log(error)
    }
    pool.query('delete from categories where categoryid=?',[req.body.id],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true);
        }
    })
})
router.post('/updatedata',function(req,res){
    pool.query('update categories set categoryname=? where categoryid=?',[req.body.name,req.body.id],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/updatepicture',upload.single('picture'),function(req,res){
    var a=String(req.body.oldpicture).split("/")
    try {
        fs.unlinkSync(`public/images/${a[a.length-1]}`)
    } catch (error) {
        console.log(error)
    }
    pool.query('update categories set adpicture=? where categoryid=?',[req.file.filename,req.body.id],function(error,result){
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