var express=require('express')
var router=express.Router();
var pool=require('./mysqlconnection');
router.post('/insertdata',function(req,res){
    pool.query('insert into price (minprice,maxprice) values(?,?)',[req.body.minprice,req.body.maxprice],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json(false)
        }
        else{
            res.status(200).json(true)
        }
    })
})
router.get('/fetchprice',function(req,res){
    pool.query('select * from price',function(error,result){
        if(error){
            res.status(500).json({data:[]})
        }
        else{
            res.status(200).json({data:result})
        }
    })
})
router.post('/deleteprice',function(req,res){
    pool.query('delete from price where priceid=?',[req.body.id],function(error,result){
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
    pool.query('update price set minprice=?,maxprice=? where priceid=?',[parseInt(req.body.minprice),req.body.maxprice,req.body.id],function(error,result){
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