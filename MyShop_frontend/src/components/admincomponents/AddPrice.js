import React from 'react'
import { useState } from 'react'
import { TextField,Button,makeStyles,Grid } from '@material-ui/core'
import swal from '@sweetalert/with-react'
import { isEmpty,isDigit,ErrorMessage } from '../checks'
import { postData } from '../fetchfromnode'
const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:20
    },
    subdiv:{
        
        padding:20,
       background:'#bdc3c7',
       height:'auto',
       width:600,
    },

    heading:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
    }
    ,
    items:{
        margin:5,
    }
})
)
export default function AddPrice(){
    const classes=useStyles();
    const [getMinPrice,setMinPrice]=useState("");
    const [getMaxPrice,setMaxPrice]=useState("");
    const handelClick=async()=>{
        var err=false
        var a=0;
        if(isEmpty(getMinPrice)){
            ErrorMessage("Minimum Price Not Be Empty")
            a=1
            err=true
        }
        if(!isDigit(getMinPrice) && a!==1){
            ErrorMessage("Minimum Price Must Be Positive Integer Value")
            err=true
            a=0
        }
        if(isEmpty(getMaxPrice)){
            ErrorMessage("Maximum Price Not Be Empty")
            a=1
            err=true
        }
        if(!isDigit(getMaxPrice) && a!==1){
            ErrorMessage("Maximum Price Must Be Positive Integer Value")
            err=true
            a=0
        }
        if(parseInt(getMaxPrice)<=parseInt(getMinPrice)){
            ErrorMessage("Maximum Price Must Be Greater Then Minimum Price")
            err=true
            a=0
        }
        if(!err){
        var body={minprice:getMinPrice,maxprice:getMaxPrice}
        var result=await postData('price/insertdata',body)
        if(result){
            swal(
        <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Record",
        text: "successfully Submmited",
        icon: "success",
            })
        }
        else{
            swal(
                <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3>
                <h3 style={{color:'red'}}>Server Error...</h3></div>
                ,{
                title: "Your Record",
                text: "Failed To submit try again..",
                icon: "error",
                    })
        }}
    }
    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                        <h3 className={classes.heading}><img alt="..."  src="/lenslogo.png" style={{width:50,height:20}} /> Set Price Range</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" fullWidth className={classes.items} label="Minimum Price" onChange={(event)=>setMinPrice(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" className={classes.items} fullWidth label="Maximum Price" onChange={(event)=>setMaxPrice(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained"  className={classes.items} style={{background:"#636e72",color:'#55E6C1'}} fullWidth onClick={()=>handelClick()}>Set Price Range</Button>
                </Grid>
                </Grid>
            </div>
        </div>
    )
}