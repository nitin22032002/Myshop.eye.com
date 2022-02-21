import React,{useState,useEffect} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Radio,makeStyles } from '@material-ui/core'
import { ServerUrl,postData } from '../fetchfromnode'
import {useHistory} from 'react-router-dom'

const useStyle=makeStyles((theme)=>({
  root:{
    width:270,
    [theme.breakpoints.up("sm")]:{
      width:360,
      marginLeft:25,
      padding: 10,
        margin: 10,
    }
  }
}))
export default function Product(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2000, min: 500 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };  
  const history=useHistory()
    const [getFinalProducts,setFinalProducts]=useState([])
    const [getStatus,setStatus]=useState(false)
    const [getPicture,setPicture]=useState([])
    const [getChecked,setChecked]=useState(null);
    // eslint-disable-next-line
    const [item,setItem]=useState(props.item)
    const [productStyle, setProductStyle] = useState({
        height: 300,
        
        borderRadius:20,
        display:'flex',
        flexDirection:'column'
      });
      const fetchAllColor=async()=>{
          let body={productid:props.item.productid}
          postData('finalproduct/getByProductId',body).then((result)=>{
            setFinalProducts(result)
            if(result.length!==0){setChecked(result[0])
              handlePicture(result[0].finalproductid);
            }
            })
          
          
      }
      const handleMouseLeave=()=>{
        if(props.value!=="home"){
        setProductStyle({...productStyle,border:''})
        setStatus(false)}
      }
      useEffect(() => {
        if(props.value==="home"){
            fetchAllColor();
            setStatus(true)
        }
        // eslint-disable-next-line
      },[])
      const handleMouseEnter=async()=>{
        if(props.value!=="home"){
          setProductStyle({...productStyle,border:'1px solid black'})
            await fetchAllColor();
            setStatus(true)
      }}
      const showPicture=()=>{
        return(
          <Carousel responsive={responsive} stopOnHover={false} infinite={true} arrows={false} keyBoardControl={false} autoPlay={true} autoPlaySpeed={props.value!=="home"?800:1500} draggable={false} >
          {getPicture.map((item)=>{
            // alert(JSON.stringify(item))
            return(
            <div>
              <img alt="..."   src={`${ServerUrl}/images/${item.image}`} width="99%" height="180" style={{cursor:'grab'}} onClick={handleOpenProduct} />
            </div>)
          })}
          </Carousel>
        )
      }
      const handlePicture=async(id)=>{
        if(props.play!=="not"){
        let body={productid:id}
          var result=await postData('finalproduct/getPicByProductId',body);
          await setPicture(result)
        }
      }
      const handleOpenProduct=()=>{
        document.title=`${item.productname}-IndoForest`
        history.push('/product',{item:item,color:getFinalProducts,selected:getChecked})
      }
    return (
        <div style={productStyle} className={useStyle().root}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {!getStatus || getPicture.length===0?<div style={{height:210}}><img alt="..."   src={`${ServerUrl}/images/${(getStatus && getChecked)?getChecked.picture:item.picture}`} width="99%" height="200" style={{cursor:'grab'}} onClick={handleOpenProduct}/></div>:<div style={{height:210}}>{showPicture()}</div>}
        {getStatus?
        <><div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        {getFinalProducts.map((item,index)=>{
            return(
            <Radio title={item.colorname} key={item.finalproductId} checked={getChecked!==null?getChecked===item:index===0} onClick={()=>{setChecked(item);handlePicture(item.finalproductid)}} style={{color:String(item.colorname).toLowerCase()}}></Radio>
        )})}</div>
        <center>{props.item.productname}</center>
        <center>{getFinalProducts.length!==0?((getChecked?getChecked.offerprice<=0?<span>{"₹"+getChecked.price}</span>:<span><s>{"₹"+getChecked.price}</s><span style={{color:"blue",marginLeft:12}}>{"₹"+getChecked.offerprice}</span></span>:"₹"+getFinalProducts[0].price)):"Out of Stock"}</center>
        </>
        :<></>}
        </div>
    )
}
