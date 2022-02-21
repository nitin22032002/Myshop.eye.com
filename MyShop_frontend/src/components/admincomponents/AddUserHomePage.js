import React from 'react';
import {useState } from 'react';
import { makeStyles,Button,TextField,Avatar,Grid,Select,FormControl,InputLabel,MenuItem} from '@material-ui/core';
import {isEmpty,ErrorMessage} from '../checks'
import {insertDataImage} from '../fetchfromnode';
import swal from '@sweetalert/with-react'
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
    formControl: {
      margin: theme.spacing(1),
    },
    heading:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
    },
    input: {
      display: 'none',
    }
    ,
    items:{
        margin:5,
    }
})
)
export default function AddUserHomePage(props){
    const classes=useStyles();
    const [getPosition,setPosition]=useState("")
    const [getPicture,setPicture]=useState({filename:"",bytes:""});
    const [getStatus,setStatus]=useState("")
    const handelPicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handelClick=async()=>{
       var err=false;
       if(isEmpty(getPosition)){
        ErrorMessage(`Position Not be Empty`)
        err=true;
    }
        if(isEmpty(getPicture.filename)){
            ErrorMessage(`Image Not Be Empty`)
            err=true;
        }
        if(!err){
            var formdata=new FormData()
        
            formdata.append("position",getPosition);
            formdata.append("picture",getPicture.bytes);
            formdata.append('status',getStatus);
            var config={"content-type":"multipart/form-data"}
            var result=await insertDataImage("userhome/insertdata",formdata,config);
            if(result){
                swal(
            <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
            ,{
            title: "Your Record",
            text: "successfully Submmited",
            icon: "success",
                })
            }
            else{
                swal(
                    <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3>
                    <h3 style={{color:'red'}}>Server Error...</h3></div>
                    ,{
                    title: "Your Record",
                    text: "Failed To submit try again..",
                    icon: "error",
                        })
            }
        }
    }
    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container>
                    <Grid item xs={12}>
                        <h3 className={classes.heading}><img alt="..."   src="/lenslogo.png" style={{width:50,height:20}} /> Add Picture</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant="outlined" className={classes.items} label="Position" fullWidth onChange={(event)=>setPosition(event.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Advertisment Status</InputLabel>
        <Select
          labelId="State_Label"
          id="state"
          // value={'Madhya Pradesh'}
          label="Advertisment Status"
          onChange={(event)=>setStatus(event.target.value)}
        >
          <MenuItem value={"Active"}>Active</MenuItem>
          <MenuItem value={"Deactive"}>Deactive</MenuItem>
        </Select>
      </FormControl>
        </Grid>
                    <Grid item xs={6} style={{textAlign:'center'}}>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(event)=>handelPicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" className={classes.items} color="primary" component="span">
          Upload
        </Button>
      </label>
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  className={classes.items} style={{height:50,width:50}}  variant="rounded" src={getPicture.filename} />
        </Grid>
    
                <Grid item xs={12}>
                    <Button variant="contained"  className={classes.items} style={{background:"#636e72",color:'#55E6C1'}} fullWidth onClick={()=>handelClick()}>Add Picture</Button>
                </Grid>
                </Grid>
                </div>
        </div>
    )
}