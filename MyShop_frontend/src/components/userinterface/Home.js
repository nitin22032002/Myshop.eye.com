import React, { useEffect, useState } from 'react'
import './User.css'
import Header from './header'
import { fetchdata, ServerUrl } from '../fetchfromnode'
import RecommendProduct from './RecommendProduct'
import Footer from './Footer'
import { Button, makeStyles,Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    mainButton:{
        display:"none",
        
        [theme.breakpoints.up("sm")]:{
            display: 'flex', 
            flexDirection: "column", 
            position: "absolute", 
            top: '30%', 
            right: '10%', 
            width:"35%"
        },
        [theme.breakpoints.up("md")]:{
            display: 'flex', 
            flexDirection: "column", 
            position: "absolute", 
            top: '50%', 
            right: '5%', 
            width:"27%"
        }
        
    }

}))

export default function Home(props) {
   const classes=useStyles()
    const [getPictures, setPictures] = useState([])
    const fetchHomePicture = async () => {
        
        let result = await fetchdata(`${ServerUrl}/finalproduct/homepictures`);
        result = await result.data
        setPictures(result)
    }
    useEffect(function () {
        
        fetchHomePicture();
    }, [])
    const fillPictures = () => {
        return (
            getPictures.length !== 0 &&
            <div style={{width:"99%"}}><div>
                
                    <img alt="..." src={`${ServerUrl}/images/${getPictures[0].picture}`} width="100.5%" style={{marginLeft:5}} />
                    <Hidden smUp>
                        <div style={{display:"flex",flexDirection:"column",position:"absolute",top:"25%",right:"5%"}}>
                    <Button  variant='outlined' onClick={()=>{ props.history.push('/products', { id: 6, name: "EyeGlass" });document.title="IndoForest-EyeGlass"}}  style={{ backgroundColor:"#303952",marginBottom:5,color:"whitesmoke" }} >Shop EyeGlass</Button>
                    <Button variant='outlined'  style={{ marginBottom: 2 ,backgroundColor:"#303952",color:"whitesmoke"}}  onClick={()=>{ props.history.push('/products', { id: 7, name: "SunGlass" });document.title="IndoForest-SunGlass"}} >Shop SunGlass</Button>     
                        </div>
                    </Hidden>
                    <div className={classes.mainButton}>
                    <div style={{ marginBottom: 4, fontSize: 18,cursor:"default" }}>Stylish Eyewear That</div>
                    <div style={{ fontSize: 18,cursor:"default" }}>Is Premium, Not Expensive!</div>
                    <Button  variant='outlined' onClick={()=>{ props.history.push('/products', { id: 6, name: "EyeGlass" });document.title="IndoForest-EyeGlass"}}  style={{ marginBottom: 13,color:"whitesmoke",backgroundColor:"#303952", marginTop: 13 }} >Shop EyeGlass</Button>
                    <Button variant='outlined'  style={{ marginBottom: 2 ,backgroundColor:"#303952",color:"whitesmoke"}}  onClick={()=>{ props.history.push('/products', { id: 7, name: "SunGlass" });document.title="IndoForest-SunGlass"}} >Shop SunGlass</Button>
                    <div style={{ display: 'flex', alignItems: 'center' }}> <p onMouseEnter={(event)=>{event.target.style.fontWeight='bold'}} onMouseLeave={(event)=>{event.target.style.fontWeight=''}} onClick={()=>{alert("Hello")}} style={{fontSize:'18px',cursor:'pointer'}}>Take our style quiz <span style={{ marginLeft: 6, width: 10, marginTop: 2 }}>
                        <img src="https://cdn.shopify.com/s/files/1/1276/5299/files/Untitled-1_1.png?v=1616576831" alt="take our style" />
                    </span></p>
                    </div> </div>


                <div style={{width:"99%", fontFamily: "sans-serif", letterSpacing: 2, textAlign: "center", cursor: "pointer",fontSize:"18px",fontWeight:100 }}>
                    <p style={{fontWeight:600}}>New This Week!</p>
                    <p>This summer, we’re bringing back the cat-eye trend with a colourful twist! Transform your look with these trendy tinted tonics in fresh colour options!</p>
                </div>
                <img width="99%" alt="..." src={`${ServerUrl}/images/${getPictures[1].picture}`} style={{ margin: 10 }} />
                <img width="99%" alt="..." src={`${ServerUrl}/images/${getPictures[2].picture}`} style={{ margin: 10 }} />
                <div style={{ textAlign: "center",width:"99%" }}>
                    <p style={{ textDecoration: "underline",fontSize:"30px",fontWeight:700,marginLeft:3,cursor:"default" }}>Our Recommendations</p>
                    <RecommendProduct />
                </div>
                {getPictures.map((item, index) => {
                    if (index > 2) {
                        return (
                            <img width="99%" alt="..." src={`${ServerUrl}/images/${item.picture}`} style={{ margin: 10 }}  />
                        )
                    }
                    return ""
                })}
                </div>
           
            </div>
        )
    }
    return (
        <div>
            <Header key="home" value="home" history={props.history} />
            {fillPictures()}
            <Footer />
        </div>
    )
}