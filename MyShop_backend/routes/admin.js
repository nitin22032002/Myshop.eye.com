const express=require('express')
const router=express.Router();
const pool=require('./mysqlconnection')
router.post('/checklogin',function(req,res){
    pool.query('select * from administrator where emailid=? and password=?',[req.body.email,req.body.password],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else if(result.length==0){
            res.status(200).json(false)
        }
        else{
            res.status(200).json(true)
        }
        
    })
})
module.exports=router;