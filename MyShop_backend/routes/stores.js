const express=require('express');
const router=express.Router();
const pool=require('./mysqlconnection');
const upload=require('./upload')
const fs=require('fs')
router.get('/fetchstate',function(req,res){
    pool.query('select * from states',function(err,result){
        if(err){
            console.log(err);
            res.status(500).json([])
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.get('/fetchstores',function(req,res){
    pool.query('select * from stores',function(err,result){
        if(err){
            console.log(err);
            res.status(500).json([])
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/insertdata',upload.single('picture'),function(req,res){
    pool.query('insert into stores (storename, storecity, storestate, addressone, addresstwo, landmark, contactnumber, emailaddress, latitude, longitude, picture, storestatus) values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.shopname,req.body.city,req.body.state,req.body.addressone,req.body.addresstwo,req.body.landmark,req.body.mobile,req.body.email,req.body.latitude,req.body.longitude,req.file.filename,parseInt(1)],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.post('/deletestore',function(req,res){
    pool.query('delete from stores where storeid=?',[req.body.id],function(err,result){
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
    pool.query('update stores set picture=? where storeid=?',[req.file.filename,req.body.id],function(err,result){
        if(err){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }

    })
})
router.post('/updatestore',function(req,res){
    pool.query('update stores set storename=?, storecity=?, storestate=?, addressone=?, addresstwo=?, landmark=?, contactnumber=?, emailaddress=?, latitude=?, longitude=?, storestatus=? where storeid=?',[req.body.shopname,req.body.city,req.body.state,req.body.addressone,req.body.addresstwo,req.body.landmark,req.body.mobile,req.body.email,req.body.latitude,req.body.longitude,parseInt(1),req.body.storeid],function(error,result){
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