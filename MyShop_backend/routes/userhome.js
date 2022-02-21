const express=require('express');
const router=express.Router();
const fs=require('fs')
const pool=require("./mysqlconnection")
const upload=require('./upload');
router.get('/fetchall',function(req,res){
    pool.query('select * from homepage',function(error,result){
        if(error){
            console.log(error);
            res.status(500).json({data:[]});
        }
        else{
            res.status(200).json({data:result});
            
        }
    })
})
router.post('/insertdata',upload.single('picture'),function(req,res){
    pool.query("insert into homepage (position,status,picture) values(?,?,?)",[req.body.position,req.body.status,req.file.filename],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/updatedata',function(req,res){
    pool.query("update homepage set position=?,status=? where pictureid=?",[req.body.position,req.body.status,req.body.id],function(error,result){
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
    pool.query("update homepage set picture=? where pictureid=?",[req.file.filename,req.body.id],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/deletedata',function(req,res){
    var a=String(req.body.img).split("/")
    try {
        fs.unlinkSync(`public/images/${a[a.length-1]}`)
    } catch (error) {
        console.log(error)
    }
    pool.query("delete from homepage where pictureid=?",[req.body.id],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true);
        }
    })
})
router.post('/selectproduct',function(req,res){
    // query='select * from products where shapeid in (4)'
    query=`select p.*,(select materialname from materials where materialid=p.materialid) as materialname,(select shapename from shapes where shapeid=p.shapeid) as shapename,(select categoryname from categories where categoryid=p.categoryid) as categoryname,(select framename from frames where frameid=p.frameid) as framename from products p ${req.body.where} group by p.productname`
    // query=`select c.*, from products c ${req.body.where}`
    console.log(query)
    pool.query(query,function(error,result){
        if(error){
            console.log(error);
            res.status(500).json([])
        }
        else{
            res.status(200).json(result);
        }
    })
})
module.exports=router;