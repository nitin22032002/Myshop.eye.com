import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import { TextField,Grid,Button,Hidden } from "@material-ui/core";
import {Send,ShoppingCart} from '@material-ui/icons'
import { useDispatch,useSelector } from "react-redux";
import {postData} from '../fetchfromnode'
import InputAdornment from "@material-ui/core/InputAdornment";
import Header from "./header";
import Footer from "./Footer";

import "./otpstyle.css" 
 
import OtpInput from 'react-otp-input';
const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    subdiv:{
          width:'300',
          height:'auto',
          background:'#f1f2f6',
          marginTop:10,
          backgroundImage:"",
          borderRadius:5
          
          
  }

}))
export default function Login(props)
{const classes = useStyles();
  const [mobileno,setMobileNo]=useState('')
  const [otp,setOtp]=useState("")
  const [gotp,setGotp]=useState("")
  const [getUser,setUser]=useState({"token":""})
  const [showOtp,setShowOtp]=useState(false)
  var dispatch=useDispatch()
  var cart=useSelector(state=>state.cart)
  var key=Object.keys(cart)
  const handleShowCart=()=>{

    if(String(otp)===String(gotp))
    { 
      dispatch({"type":"ADD_USER",payload:getUser.token})
      if(Object.values(cart).length===0){

        props.history.push({pathname:"/"})
      }
      else{
        props.history.push({pathname:"/cart"})
      }

    }
    else
    { 
    alert("invalid otp")

    }

  }
  const handleSend=async()=>{
    var body={number:mobileno}
    var result=await postData("users/auth/checkmobile",body)
    let otpval;
    if(result.status)
    {
    setShowOtp(true) 
    otpval=parseInt(8999*Math.random()+1000) 
    setUser({"token":result.result.token})
    setGotp(otpval)
    alert(otpval)
    //  result=await postData("sendsms/sendotp",{otp:otpval,mobileno:mobileno})
    //  console.log(result)
    }
    else if(result.code===500){
        alert("Server Error Try Again.....")
    }
    else
{
  otpval=parseInt(8999*Math.random()+1000) 
  // result=await postData("sendsms/sendotp",{otp:otpval,mobileno:mobileno})
  alert(otpval)
  // console.log(result)
  props.history.push({pathname:"/signup"},{mobileno:mobileno,otp:otpval})
}


  }
  const handleChangeOtp=(value)=>{

    setOtp(value)

  }
return(
  <div>
          <Header history={props.history} />
    <div className={classes.root}>
    <div className={classes.subdiv}>
<div style={{display:'flex',flexDirection:'row'}}>
        <Hidden smDown>

        <div style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20}}>
        <img src="/login1.jpg" alt="...." width='800'  style={{borderRadius:20,padding:5}}/>
        </div>
        </Hidden>

        <div style={{border:'1px solid #000',borderRadius:5,width:350,padding:20,margin:10}}>
        
      
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <AccountCircleRoundedIcon style={{fontSize:80}}/>
        </div>
        <div style={{fontSize:30}}>
         <b>Sign in</b>
        </div>
        <div style={{fontSize:15}}><font color="#95a5a6">Sign in to access your Orders, Offers and Wishlist.</font>
        </div>
         <br/>
        
        <Grid container spacing={2}>
        <Grid item sm={12}>
        
        <TextField 
        InputProps={{
            startAdornment: <InputAdornment position="start">+91 |</InputAdornment>,
          }}
         onChange={(event)=>setMobileNo(event.target.value)} variant="outlined" label="Mobile No." fullWidth/>
        
        
        </Grid>
     
        
        
        
        <Grid item sm={12}>
<Button onClick={()=>handleSend()}
fullWidth style={{background:"#50526e",color:'#fff'}} variant="contained" color="primary" endIcon={<Send />}>Send</Button>

</Grid>
<Grid item sm={12}>
     {showOtp?<><OtpInput
        value={otp}
        onChange={(value)=>handleChangeOtp(value)}
        numInputs={4}
        inputStyle="inputStyle"
        separator={<span>-</span>}
      />
      {key.length>0?
      <Button  onClick={()=>handleShowCart()}
fullWidth style={{background:"#50526e",color:'#fff',marginTop:10}} variant="contained" color="primary" endIcon={<ShoppingCart />}>Proceed to Cart</Button>:
<Button  onClick={handleShowCart}
fullWidth style={{background:"#50526e",color:'#fff',marginTop:10}} variant="contained" color="primary" endIcon={<ShoppingCart />}>Continue Shopping</Button>
      }
</>

    :<></>}
      </Grid>  
</Grid>
&nbsp;
     <div style={{textAlign:'center', fontSize:13}}>
     By continuing you agree to our <font color='red'>Terms of service</font>
     <br/>
     and
     <font color='red'>Privacy & Legal Policy.</font>
     </div>   
        
        



        </div>
        </div>

</div>

</div>
<Footer history={props.history} />
    </div>
)
}