import React from 'react'
import { postData } from '../fetchfromnode';
import { Grid } from '@material-ui/core';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from './ProductComponent';
export default function SimilarProduct(props) {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 2000 },
          items: 3
        },
        desktop: {
          breakpoint: { max: 3000, min: 984 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 984, min: 575 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 575, min: 430 },
          items: 1.5
        },
        mobile1: {
          breakpoint: { max: 430, min: 0 },
          items: 1
        }
      };
    const [product,setProduct]=React.useState([])
    const [productId,setProductId]=React.useState(props.productid)
    const {categoryid,frameid,shapeid,productid,materialid}=props;
    const fetchProduct=async()=>{
        let body={categoryid,frameid,shapeid,productid,materialid}
        let result=await postData('finalproduct/similarproduct',body);
        setProduct(result);
    }
    if(productId!==props.productid){
        fetchProduct()
        setProductId(productid);
    }
    const fillProduct = () => {
        return (
            <Carousel  responsive={responsive} infinite={true}  >
            
            {
            product.map((item, index) => {
                return(
             <Grid xs={12} sm={6} md={4} sl={4}>
               <Product item={item} value="home" play="not"  key={item.productname+"similar"}/>
             </Grid>
                )      
            })}
            </Carousel>
            
        )
    }
    React.useEffect(function(){
        fetchProduct();
        // eslint-disable-next-line 
    },[])
    return (
        <>
        <h2 style={{textAlign:'center',textTransform:"uppercase",letterSpacing:1}}>Similar Product</h2>    
        <div  style={{height:400,width:"100%"}}>
            {fillProduct()}
        </div>
        </>
    )
}