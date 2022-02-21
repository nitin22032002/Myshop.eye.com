var express=require('express')
var router=express.Router();
var pool=require('./mysqlconnection');
var upload=require('./upload');
var fs=require('fs')
router.post('/insertdata',upload.single('picture'),function(req,res){
    var b=String(req.body.tablename)
    var b=b.slice(0,b.length-1)+'name';
    var a=`insert into ${req.body.tablename} (${b},adpicture,status) values(?,?,?)`
    pool.query(a,[req.body.shapename,req.file.filename,req.body.status],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.get('/fetchshape',function(req,res){
    pool.query(`select * from ${req.query.a}`,function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({data:[{error:error,status:false}]})
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/deleteshape',function(req,res){
    var a=String(req.body.img).split("/")
    try {
        fs.unlinkSync(`public/images/${a[a.length-1]}`)
    } catch (error) {
        console.log(error)
    }
    var b=String(req.body.tablename)
    var b=b.slice(0,b.length-1);
    pool.query(`delete from ${req.body.tablename} where ${b}id=?`,[req.body.id],function(error,result){
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
    var b=String(req.body.tablename)
    var b=b.slice(0,b.length-1);
    pool.query(`update ${req.body.tablename} set ${b}name=?,status=? where ${b}id=?`,[req.body.name,req.body.status,req.body.id],function(error,result){
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
    var b=String(req.body.tablename)
    var b=b.slice(0,b.length-1);
    try {
        fs.unlinkSync(`public/images/${a[a.length-1]}`)
    } catch (error) {
        console.log(error)
    }
    pool.query(`update ${req.body.tablename} set adpicture=? where ${b}id=?`,[req.file.filename,req.body.id],function(error,result){
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