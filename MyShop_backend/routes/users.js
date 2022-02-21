var express = require('express');
const pool = require('./mysqlconnection');
var router = express.Router();
const jwt=require('jsonwebtoken')
const SECRET_STRING="glasskartproject@@@@$$$!!@!@!@!@"
/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query("CREATE SCHEMA `assignmentsubmmision`",function(error,result){
    if(error){
      console.log(error)
      
    }
    else{
      console.log(result)
    }
  })
  pool.query("CREATE  table assignmentsubmmision.user('id')",function(error,result){
    if(error){
      console.log(error)
      res.render("error")
    }
    else{
      console.log(result)
      res.render('index')
    }
  })
});
router.post("/auth/checkmobile",(req,res)=>{
  try{
    pool.query("select userid from user where mobilenumber=?",[req.body.number],(err,result)=>{
      if(err){
        console.log(err)
        throw Error(`${e}`)
      }
      else if(result.length===0){
        return res.status(401).json({"status":false,"code":401})
      }
      else{
        let token=jwt.sign({"userid":result[0].userid,"mobile":req.body.number},SECRET_STRING)
        return res.status(200).json({"status":true,result:{token}})
      }
    })
  }
  catch(e){
    console.log(e)
    return res.status(500).json({"status":false,"code":500})
  }
})

router.post('/adduser',function(req,res){
  let name=req.body.name
  let emailid=req.body.emailid
  let mobilenumber=req.body.mobilenumber
  let password=req.body.password
  pool.query('insert into user (name,password,emailid,mobilenumber) values(?,?,?,?)',[name,password,emailid,mobilenumber],function(error,result){
    if(error){
      console.log(error)
      return res.status(500).json({"status":false})
    }
    else{
     let token=jwt.sign({"userid":result.insertId,mobile:mobilenumber},SECRET_STRING)
      return res.status(200).json({"status":true,"token":token})
    }
  })
})

router.post("/fetchuser",(req,res)=>{
  try{
    let token=req.body.token;
    let data=jwt.verify(token,SECRET_STRING)
    if(data){
      
      pool.query("select * from user where userid=?",[data.userid],(err,result)=>{
        if(err){
          console.log(err)
          throw Error("Invalid User")
        }
        else{
          return res.status(200).json({"status":true,"data":result[0]})
        }
      })
    }
    else{
      return res.status(401).json({'status':false,"code":401})
    }
  }
  catch(e){
    console.log(e)
    return res.status(500).json({"status":false,"code":500})
  }
}) 
router.post("/addaddress",(req,res)=>{
  try{
    
    let data=req.body
    pool.query("insert into address (userid,number,house,address,landmark,pincode,name,city,state) values(?,?,?,?,?,?,?,?,?)",[data.userid,data.mobilenumber,data.housenumber,data.address,data.landmark,data.pincode,data.name,data.city,data.state],(err,result)=>{
        if(err){
          console.log(err)
          throw Error("Failed....")
        }
        else{
          return res.status(200).json({"status":true})
        }
    })
  }
  catch(e){
    console.log(e)
    return res.status(500).json({"status":false})
  }
})

router.post("/fetchalladdress",(req,res)=>{
  try{
      let id=req.body.id
      
      pool.query(`select * from address where userid=?`,[id],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).json({"status":false})
        }
        else if(result.length===0){
          return res.status(200).json({"status":false})
        }
        else{
          return res.status(200).json({"status":true,data:result})

        }
      })
  }
  catch(e){
    console.log(e)
    return res.status(500).json({"status":false})
  }
})

router.post("/deleteaddress",(req,res)=>{
try{
    let id=req.body.id
    
    pool.query(`delete from address where addressid=?`,[id],(err,result)=>{
      if(err){
        console.log(err)
        return res.status(500).json({"status":false})
      }
      
      else{
        return res.status(200).json({"status":true,data:result})

      }
    })
}
catch(e){
  console.log(e)
  return res.status(500).json({"status":false})
}
}) 
router.get("/fetchstoresbycity",(req,res)=>{
  try{
      pool.query('select s.*,(select statename from states where stateid=s.storestate) as state from stores s where s.storecity=?',[String(req.query.name).toLowerCase()],(err,result)=>{
        if(err){
          console.log(err)
          throw Error("Error")
        }
        else{
          console.log(result)
          return res.status(200).json({'data':result})
        }
      })
  }
  catch(e){
    console.log(e)
    return res.status(500).json({'data':[]})
  }
})
module.exports = router;
