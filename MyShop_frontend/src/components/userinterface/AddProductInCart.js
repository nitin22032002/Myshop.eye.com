import React, { useState } from 'react'
import {Button} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Remove } from '@material-ui/icons';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
export default function AddProductInCart(props) {
  const cart=useSelector((state)=>state)
  console.log(cart)
  useEffect(()=>{
    setCount(cart.cart[props.item.finalproductid]===undefined?"0":cart.cart[props.item.finalproductid].qty)
  // eslint-disable-next-line
  },[props.refresh])
  const dispatch=useDispatch()
    const [getCount,setCount]=useState(cart.cart[props.item.finalproductid]===undefined?"0":cart.cart[props.item.finalproductid].qty)
    console.log(props.item)
    const handleDelete=()=>{
      if(parseInt(getCount)-1===0){
        dispatch({type:"Delete_Product",payload:props.item.finalproductid})
      }
      else{
        dispatch({type:"Update_Product",payload:[props.item.finalproductid,-1]})
      }
      setCount(String(parseInt(getCount)-1))
      props.setRefresh(!props.refresh)
    }
    const handleAdd=()=>{
      dispatch({type:"Update_Product",payload:[props.item.finalproductid,1]})
      setCount(String(parseInt(getCount)+1))
      props.setRefresh(!props.refresh)
    }
    return (
        <div>
        {getCount!=='0'?<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Fab size="small" style={{backgroundColor:"#303952"}} aria-label="add" onClick={()=>{handleDelete()}} >
          <Remove style={{color:"white"}} />
        </Fab>
        <div style={{fontSize:24,fontWeight:'bold',marginInline:20}}>{getCount}</div>
        <Fab size="small"style={{backgroundColor:"#303952"}} aria-label="add"  disabled={getCount>=5 || getCount>=props.item.stock} onClick={()=>{handleAdd()}} >
        <AddIcon style={{color:"white"}}  />
        </Fab>
        </div>:  <Button variant='outlined' style={{ width: "80%", height: "60px", backgroundColor: "#303952", color: 'white' }} onClick={()=>{setCount('1');dispatch({type:"ADD_Product",payload:[props.item.finalproductid,{qty:1,item:props.item}]});props.setRefresh(!props.refresh)}}>Add To Cart</Button>}    
        
        </div>
    )
}
