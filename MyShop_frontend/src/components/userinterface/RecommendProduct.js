import React, { useState, useEffect } from 'react';
import { postData} from '../fetchfromnode';
import { Button, Grid } from '@material-ui/core';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from './ProductComponent';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }; 
export default function RecommendProduct(props) {
    const [getProduct, setProduct] = useState([])
    const [getStatus, setStatus] = useState("New Arrival")
    const fetchProduct = async () => {
        let body = { status: getStatus }
        let result = await postData(`finalproduct/products`, body);
        setProduct(result.data)
    }
    const fillProduct = () => {
        return (
            <Carousel  responsive={responsive} infinite={true}  >
            
            {
            getProduct.map((item, index) => {
                return(
             <Grid xs={4}>
               <Product item={item} value="home" key={item.productname}/>
             </Grid>

            )
            
            })}
            </Carousel>
        )
    }
    useEffect(function () {
        fetchProduct()
        // eslint-disable-next-line
    }, [getStatus])
    return (
        <div style={{width:"100%"}}>
            <Grid container spacing={2} style={{ textAlign: "center" }}>
                <Grid item xs={6}>
                    <Button style={{ fontSize: 18,textDecoration:getStatus==="New Arrival"?'underline':"",fontWeight:getStatus==="New Arrival"?'bold':"" }} onClick={(event) => { setStatus("New Arrival"); }}>New Arrival</Button>
                </Grid>
                <Grid item xs={6} >
                    <Button style={{ fontSize: 18,textDecoration:getStatus==="Best Seller"?'underline':"",fontWeight:getStatus==="Best Seller"?'bold':"" }} onClick={(event) => { setStatus("Best Seller");}}>
                        Best Seller</Button>
                </Grid>
            </Grid>
           
                    <div style={{height:400}}>
                {fillProduct()}
 </div>           
        </div>
    )
}