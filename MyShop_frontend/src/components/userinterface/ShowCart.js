import React, { useState} from "react";
import Header from "./header";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import {ServerUrl } from "../fetchfromnode";
import { Button, Divider } from "@material-ui/core";
import ShoppingCart from "./ShopCart";
import { useDispatch, useSelector } from "react-redux";



export default function ShowCart(props) {

  

  var dispatch=useDispatch()  
  const [refresh,setRefresh]=useState(false)
  var cart=useSelector(state=>state.cart)
  const user=useSelector(state=>state.user)
  var key=Object.keys(cart)
  var products=Object.values(cart)

  //console.log('Total Amount:',totalamt)
  const netPrice=(products)=>{
    console.log("Net Products : ",products)
    let netamt=products.reduce((a,b)=>{
        return (a+(b.item.offerprice>0?b.item.offerprice:b.item.price)*b.qty)
    },0)
    return netamt;
  }
  const totalAmount=(products)=>{
    console.log("Total Products : ",products)
    let netamt=products.reduce((a,b)=>{
        return (a+b.item.price*b.qty)
    },0)
    return netamt; 
  }
  let TotalAmount=totalAmount(products)
  let NetAmount=netPrice(products)
  let savingAmount=TotalAmount-NetAmount



   
 
///////////////////////   Show Cart  ///////////////////////

const handleQtyChange = (value,item,qty) => {
  if (value === 0 || qty-value===0) {
    dispatch({ type: "Delete_Product", payload: [item.finalproductid] });
  } else {
    
    dispatch({ type: "Update_Product", payload: [item.finalproductid, parseInt(value)-parseInt(qty)] });
  }
  setRefresh(!refresh);
};
const displayCartItems=()=>{
  return products.map((item)=>{
    let qty=item.qty
    item=item.item
return(

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
      <ShoppingCart key={item.finalproductid}  id={item.finalproductid} value={qty}  
      onChange={(value) => handleQtyChange(value,item,qty)} 
      />
   </div>

 </div>

)
  })
} 






  const paymentDetails = () => {

 

    return (
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 15 ,paddingRight:20 }}>
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
            borderRadius:5


          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10,display:'flex' }}>
            Apply Coupon


             <div style={{display:'flex',justifyContent:'flex-end',marginLeft:8,fontSize:14,cursor:'pointer'}}>
                <font color='red' > VIEW ALL </font>
             </div>  </div>

        {Object.values(user).length===0?<> <div style={{ fontWeight: 200, marginBottom: 10 }}>
          <font color='blue' style={{cursor:'pointer'}} onClick={()=>{props.history.replace({"pathname":"/usersignin"})}}><b><u>Log in </u></b></font>&nbsp;to see best offers and cashback deals
          </div>
          <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Currently this feature is not available
          </div></>:<div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Currently No Coupon available
          </div> }
        </div>
    
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            borderRadius:5
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Payment Details
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              M.R.P
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {TotalAmount}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Savings
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {savingAmount}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Delivery Charges
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {0}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Total Amount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {NetAmount}
            </div>
          </div>
          <Divider />
        </div>

        <div style={{ margin: 10,display:'flex', justifyContent:'flex-end' }}>

          <Button
            variant="contained"
            color='primary'
            onClick={()=>props.history.push({'pathname':'/payment'})}
    >
            Place Order
          </Button>

        </div> 
      </div>
    )
  
} 

  







  return (
    <>
      <Header history={props.history} setRefresh={setRefresh} refresh={refresh}  />
    <div style={{ background: "#ecf0f1" }}>
      <div style={{ padding: 25, paddingLeft:20 }}>
        <Grid container spacing={1}>
          <Grid items xs={12}  sm={6}>
            <h4>My Cart({key.length})</h4>
          </Grid>
          <Grid items xs={12}  sm={6}>
            <h4>Icon</h4>
          </Grid>

          <Grid items xs={12}  sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFF",
                
                padding: 10,
                marginBottom:20,
                borderRadius:5,


              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,


                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Summary 
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 525,
                    textAlign: "right",
                  }}
                >
                  &#8377; {NetAmount}
                </div>
              </div>

              {displayCartItems()}
            </div>
          </Grid>




          <Grid items xs={12}  sm={6}>
            {paymentDetails()}
          </Grid>
        </Grid>
      </div>
    
    </div>
      <Footer history={props.history} />
    </>
    
  );
}
