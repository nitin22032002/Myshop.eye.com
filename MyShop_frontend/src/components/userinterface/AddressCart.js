import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector} from 'react-redux';
import { ServerUrl,postData } from '../fetchfromnode';
import Divider from '@material-ui/core/Divider';
import { Grid, Box,Button, TextField} from '@material-ui/core';
import Header from "./header";
import Footer from "./Footer";
import Drawer from '@material-ui/core/Drawer';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 300,
        paddingInline: 20
      },
    fullList: {
        width: 'auto',
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subdiv: {
        width: '90%',
        height: 'auto',
        marginTop: 10,
        borderRadius: 5,
    },
    margin: {
        margin: theme.spacing(1),
    },
    addressManager:{
        flexDirection:"column",
        [theme.breakpoints.up("md")]:{
            flexDirection:"row"
        }
    }
}))

export default function MainCart(props) {
    const classes = useStyles();
    const [toggleAddress,setToggleAddress]=useState(true)
    var cart = useSelector(state => state.cart)
    var key = Object.keys(cart)
    var products = Object.values(cart)
    console.log(products)
    const [addressList,setAddressList]=useState([])
    const [refresh, setRefresh] = useState(false)
    let userData = useSelector((state) => state.user);
    const [defaultAddress,setDefaultAddress]=useState({addressid:"","number":"",address:"",pincode:"",name:"",landmark:"",houseNumber:"",state:"",city:""})
    console.log(refresh)
    const [getUser,setUser]=useState({userid:"",firstname:"",lastname:"",emailid:"",mobilenumber:""})

    const [addresses,setAddresses]=useState({name:'',mobilenumber:'',pincode:'',housenumber:'',address:'',landmark:'',city:'',state:''})
///////////////////////////////////
const netPrice=(products)=>{
    console.log("Net Products : ",products)
    let netamt=products.reduce((a,b)=>{
        return (a+(b.item.offerprice>0?b.item.offerprice:b.item.price)*b.qty)
    },0)
    return netamt;
  }
  const fetchAllAddress=async(id=undefined)=>{
      if(id===undefined){
        id=getUser.userid
      }
    let data=await postData("users/fetchalladdress",{id})
    if(data.status){
        setAddressList(data.data)
        fetchAddress(data.data.length-1,data.data)
    }
    
  }
  const totalAmount=(products)=>{
    console.log("Total Products : ",products)
    let netamt=products.reduce((a,b)=>{
        return (a+b.item.price*b.qty)
    },0)
    return netamt; 
  }
  const fetchAddress=(id,address)=>{

    let data=address[id]
        setDefaultAddress({addressid:data.addressid,houseNumber:data.house,number:data.number,address:data.address,landmark:data.landmark,pincode:data.pincode,state:data.state,city:data.city,name:data.name})
        setToggleAddress(false)
  }
  const fetchUser=async()=>{
        console.log(userData)
        let token=userData.token
        let data=await postData("users/fetchuser",{"token":token})
        if(data.status){
            userData=data.data
            var name=String(userData.name).split(" ")
            setUser({userid:userData.userid,firstname:name[0],lastname:name[1],emailid:userData.emailid,mobilenumber:userData.mobilenumber})
            
            fetchAllAddress(userData.userid)
        }
        else if(data.code===401){
        window.location.href="/"
        }
        else{
            alert("please Try Again.....")
            props.history.push({"pathname":"/showcart"})
        }
  }
  useEffect(()=>{
fetchUser()
// eslint-disable-next-line
  },[])
  let TotalAmount=totalAmount(products)
  let NetAmount=netPrice(products)
  let savingAmount=TotalAmount-NetAmount

  const handleOrder=async(response)=>{
      console.log(response)
    if(response.razorpay_payment_status){
        let res=await postData("users/placeorder",{NetAmount,user:getUser,address:defaultAddress,product:products,transactionid:response.razorpay_payment_id,mode:response.razorpay_payment_mode})
        if(res.status){
            alert("Your Order Placed....")
            props.history.replace({"pathname":"/"})
        }
        else{
            alert("Server Error Try Again......")
        }

    }
    else{
        alert("Transaction failed")
    }
}
///////////////Payement Gateway////////////////////////////
const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: NetAmount*100, //  = INR 1
    name: "IndoForest",
    description: 'Gurugram,Haryana',
    image:`/lenslogo.png`,
          
    handler: handleOrder,
    prefill: {
      name: getUser.firstname + " " + getUser.lastname,
      contact:getUser.mobilenumber,
      email: getUser.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };


  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



////////////////////////////////////////////////////////////




    const [state, setState] = React.useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
      };
 
      const  handleSaveAddress=async()=>{
          
        var body={userid:getUser.userid,mobileno:getUser.mobilenumber,name:addresses.name,mobilenumber:addresses.mobilenumber,pincode:addresses.pincode,housenumber:addresses.housenumber,address:addresses.address,landmark:addresses.landmark,city:addresses.city,state:addresses.state} 
       let res=await postData("users/addaddress",body)
       if(res.status){
           
           fetchAllAddress()
           toggleDrawer('right', false)
       }
       else{
           alert("Server Error Try Again....")
       }
      }

      
      const drawer = () => {
        return (
            <div>
              <React.Fragment key={'right'}>
                <Drawer anchor={'right'} open={state['right']} onClose={() => toggleDrawer('right', false)}>
                  {toggleAddress?showAddressDrawer('right')
                  :
                  <div style={{display:"flex",flexDirection:"column"}}>
                     {fillAllAddress()}
                      <div style={{marginTop:15,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Button onClick={()=>{setToggleAddress(!toggleAddress)}} fullWidth style={{backgroundColor:"navy",color:'white',margin:5}}>Add New Address</Button>
                      </div>
                  </div>
                }
                </Drawer>
              </React.Fragment>
            </div>
          ) 
      }

    const showAddressDrawer = (anchor) => {
        return(
            <div className={classes.list}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs>
                        <div>
                         
                        <span style={{display:'flex',justifyContent:'center',alignItems:'center',}}><h3>Add Address</h3></span>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <TextField onChange={(event)=>{let a=addresses;a['name']=event.target.value;setAddresses(a)}} size="small" variant="outlined" label="Name" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" onChange={(event)=>{let a=addresses;a['mobilenumber']=event.target.value;setAddresses(a)}}  variant="outlined" label="Mob No." fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>{let a=addresses;a['pincode']=event.target.value;setAddresses(a)}} label="Pin Code" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>{let a=addresses;a['housenumber']=event.target.value;setAddresses(a)}} label="House No." fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>{let a=addresses;a['address']=event.target.value;setAddresses(a)}} label="Address" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" label="Landmark" onChange={(event)=>{let a=addresses;a['landmark']=event.target.value;setAddresses(a)}} fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>{let a=addresses;a['city']=event.target.value;setAddresses(a)}} label="City" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>{let a=addresses;a['state']=event.target.value;setAddresses(a)}} label="State" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <Button onClick={()=>handleSaveAddress()} variant="contained" disableElevation size="large" fullWidth color="primary">Save Address</Button>
                    </Grid>

                </Grid>
            </div>  
        )
    }
    const handleDeleteAddress=async(id)=>{
        let res=await postData("users/deleteaddress",{id})
        if(res.status){
            fetchAllAddress()
        } 
        else{
            alert("Server Error.......")
        }
    }
    const  fillAllAddress=()=>{
        
       
            return( 
                addressList.map((address,index)=>{
                    
                    return(
                        
                        <div key={address.addressid} style={{cursor:"pointer",border:"2px solid black",borderRadius:20,width:'85%',padding:20,margin:10,backgroundColor:String(defaultAddress.addressid)===String(address.addressid)?"rgba(246, 229, 141,0.3)":""}} >
                         <div onClick={()=>{handleDeleteAddress(address.addressid)}} style={{fontSize:18,fontWeight:500,margin:3}}><Delete/></div> 
                         <div onClick={()=>{fetchAddress(index,addressList);toggleDrawer('right', false)}}>

                         <div style={{fontSize:18,fontWeight:500,margin:3}}>{address.name}</div> 
                          <div style={{display:"inline-block",fontSize:18,fontWeight:500,margin:3}}>{address.address} {address.house}</div>
                          ,<div style={{display:"inline-block",fontSize:18,fontWeight:500,margin:3}}>{address.landmark}</div>
                          <div style={{display:"inline-block",fontSize:18,fontWeight:500,margin:3}}>{address.pincode}</div>
                          <div style={{display:"inline-block",fontSize:18,fontWeight:500,margin:3}}>{address.city} {address.state}</div>
                          <div style={{fontSize:18,fontWeight:500,margin:3}}>{address.number}</div>
                           </div>
                         </div>
                    )
                })
            )
      
        
    }
    
    const productDetails = () => {
        return products.map((item) => {
            let qty=item.qty
            item=item.item
            return (
                <div style={{display:'flex',flexDirection:'row',width:"100%"}}>
                    <div style={{padding:5,width:"25%"}}>
                    <img  src={`${ServerUrl}/images/${item.picture}`} width="100%" alt="..." />
                    </div>

                    <div style={{display:'flex',flexDirection:'column',padding:5,width:"73%"}}>
                    <div style={{marginTop:5,fontSize:14,fontWeight:700,display:'flex',justifyContent:"center",alignItems:"center"}} >
                        {item.productname}
                        <div style={{width:"80%",fontSize:16,fontWeight:600,display:'flex',padding:5,alignItem:'right',justifyContent:'flex-end',marginRight:5}} >
                        {item.offerprice>0?<span>&#8377; {item.offerprice*qty}</span>:<span>&#8377; {item.price*qty}</span>}
                        </div>  
                    </div>
                    <div style={{marginTop:5,fontSize:14,fontWeight:500}} >
                        <span>{item.colorname}&nbsp;&nbsp;</span>
                        <span>{item.offerprice>0?<span>&#8377; {item.offerprice}x{qty}</span>:<span>&#8377; {item.price}x{qty}</span>}</span>
                    </div>
                    <div  style={{marginTop:5,fontSize:14,fontWeight:500}}>
                        {item.offerprice>0?<span><s>&#8377; {item.price}</s></span>:<></>}
                    </div>
                    <div  style={{marginTop:5,marginBottom:5,fontSize:14,fontWeight:500}}>
                        {item.offerprice>0?<span style={{color:'green'}}>You save &#8377; {(item.price-item.offerprice)*qty}</span>:<span>No offer</span>}
                    </div>
                    
                </div>

            </div>

                )
        })
    }

    const handleSelectAddress = () => {
        // return products.map((item)=>{
        return (
            
                    <div className={classes.addressManager} style={{ padding: 10,display:"flex" }}>
                        {/* <Radio 
                            checked /> */} 

                          {defaultAddress.userid!=="" && <div style={{border:"2px solid black",borderRadius:20,width:'90%',padding:20}}>
                           <div style={{fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.name}</div>
                           <div style={{display:"inline-block",fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.address} {defaultAddress.houseNumber}</div>
                           ,<div style={{display:"inline-block",fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.landmark}</div>
                           <div style={{display:"inline-block",fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.pincode}</div>
                           <div style={{display:"inline-block",fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.city} {defaultAddress.state}</div>
                           <div style={{fontSize:16,fontWeight:500,margin:3}}>{defaultAddress.number}</div>
                           </div>}
                       {/* <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}> */}

                        <Button 
                            onClick={() => toggleDrawer('right', true)}
                            variant="outlined" 
                             
                            color="primary" 
                            style={{ height:50,width:"90%",margin:8,padding: 5,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                            <Add fontSize="large"/>
                            &nbsp;
                        <div style={{textTransform: "capitalize"}}>Add/Change Address</div>
                        </Button>
                            {/* </div> */}
                    </div>   

        )
        // })
    }

    const showMainCart = () => {
        return (
            <Box>
                <Box style={{ display: 'flex', marginInline: 40, flexDirection: 'column' }}>
                    <Box style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', paddingBottom: 15, paddingLeft: 5 }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: 25 }} >My Cart ({key.length})
                        </div>
                    </Box>
                    <Grid container justifyContent='space-evenly' spacing={5} direction="row">
                        <Grid item xs={12} sm={7}  >
                            <Grid item xs={12} style={{marginRight:2}}  >
                                <div style={{ border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>
                                    <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', }}>
                                        Select Delivery Address
                                    </div>
                                    <div>
                                        {handleSelectAddress()}
                                    </div>
                                </div> 
                            </Grid>
                            
                            <Grid item xs={12} style={{marginTop:5}} >
                                <div style={{ border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>
                                    <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <span>Order Summary <span style={{ color: 'grey' }}>({key.length})</span></span>
                                        <span>&#8377; {NetAmount}</span>
                                    </div>

                                    {productDetails()}

                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={5} >
                            <Grid item xs  >
                                <div style={{ display: 'flex', flexDirection: "column", border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>

                                    <div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
                                        Payment Details
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            M.R.P
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            &#8377; {TotalAmount}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            Savings
                                        </div>
                                        <div
                                            style={{
                                                color: 'green', fontWeight: 'bold'
                                            }}
                                        >
                                            &#8377; {savingAmount}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            Delivery Charges
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            &#8377; {0}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            <b>Total Amount</b>
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            <b>&#8377; {TotalAmount}</b>
                                        </div>
                                    </div>
                                </div>
                                <Box style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: 20 }}>
                                    <li
                                      onClick={()=>openPayModal()}
                                        style={{
                                            width: 250,
                                            listStyle: 'none',
                                            display: 'block',
                                            borderRadius: 5,
                                            background: '#50526e',
                                            color: '#fff',
                                            padding: 15,
                                            textAlign: 'center',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            letterSpacing: 0.5,
                                            cursor: 'pointer'
                                        }}>
                                        Make Payment
                                    </li>
                                </Box>
                            </Grid>


                        </Grid>

                    </Grid>

                </Box>



            </Box>

        )
    }

    return (
        <div>
            <Header history={props.history} setRefresh={setRefresh} />
            <br/>
            {showMainCart()}
            {drawer()}
            <Footer history={props.history} />
        </div>
    )
}