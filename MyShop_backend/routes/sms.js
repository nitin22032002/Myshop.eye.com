const express=require("express")
const router=express.Router()
const request = require("request");
router.post("/sendotp",(req,res)=>{
    try{
        let otp=req.body.otp;
        let number=req.body.mobileno
        var options = {
            method: "GET",
            url: 'http://167.114.117.218/GatewayAPI/rest',
            qs: {
        
              loginid: 'VIKSDIWS',
              password: 'vikram123@@',
              msg: `Your Otp for Glasskart login is ${otp}`,
              // msg:"okay",
              send_to: number,
             // send_to:"",
              senderId: 'VIKSDIWS',
              routeId: '8',
              snsContentType: 'english'
            },
            headers: {
              "Cache-Control": "no-cache",
        
            }
          };
        
          console.log("options:", options)
          request(options, function (error, result, body) {
            if (error) {
              console.log(error)
              return (res.json({
                result: false
              }))
            } else {
              console.log(result)
              return (res.json({
                result: true
              }))
        
            }
          })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({"status":false})
    }
})

module.exports=router;