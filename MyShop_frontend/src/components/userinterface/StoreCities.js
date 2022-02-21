import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./Footer"


const useStyles = makeStyles((theme) => ({
    bengaluru:{
        
        backgroundPosition:"-5px -3px",
    },
    delhi:{
        backgroundPosition:"-77px -3px",
    },
    pune:{
        backgroundPosition:"-77px -128px",
    },
    luchnow:{
        backgroundPosition:"-77px -254px",
    },
    hyderabad:{
        backgroundPosition:"-5px -128px",
    },
    mumbai:{
        backgroundPosition:"-5px -254px",
    },
    city_style:{
        width:'63px',
        height:"60px",
        borderRadius:100,
        border:"1px solid black",
        backgroundImage:"url('/city.png')",
        backgroundSize:"146px 382px",
    },
    pro:{
        width:"55%",
    }
}))

export default function StoreCities(props){
    const classes = useStyles();
    const City=(props)=>{
        return(
            <div onClick={()=>props.handleClick(props.cityName)} style={{border:"1px solid black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:20,borderRadius:10,width:"300px",margin:5}}>
                <div className={`${props.cityClass} ${classes.city_style}`}>
    
                </div>
                <div style={{cursor:"default",marginTop:5,fontSize:18,fontWeight:"500",textTransform:"uppercase"}}>
                        {props.cityName}
                </div>
            </div>
    ) }
const hanldeClick=(name)=>{
    props.history.push({"pathname":"/store-locator","state":{name}})
}
const cityList=["bengaluru","delhi","hyderabad","mumbai","pune","luchnow"]
return(
    <div>
        <Header/>
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",height:"100%",alignItems:"center",flexWrap:"wrap"}}>
        <div className={classes.pro} style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                {
                    cityList.map((cityName)=>{
                        return(
                          <City cityName={cityName} cityClass={classes[cityName]} handleClick={hanldeClick} />                  
                        )
                    })
                }
        </div>
    </div>
    <Footer/>
    </div>
)

}