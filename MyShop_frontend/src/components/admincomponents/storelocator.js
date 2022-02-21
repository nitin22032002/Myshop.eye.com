import React from 'react';
import { useState,useEffect } from 'react';
// import swal from 'sweetalert2';
import swal from '@sweetalert/with-react'
import {fetchdata,insertDataImage,ServerUrl} from "../fetchfromnode"
import {makeStyles,Button,Grid,Select,Avatar,InputLabel,FormControl,MenuItem,TextField} from '@material-ui/core';
import {isEmpty,isAlphabets,isMobile,isEmail,ErrorMessage} from '../checks'
import 'react-toastify/dist/ReactToastify.css';
import Geocode from "react-geocode";
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
        width:700
     },
     formControl: {
        margin: theme.spacing(1),
      },
      heading:{
          textAlign:'center',
          fontSize:20,
          fontWeight:'bold',
      },
      input: {
        display: 'none',
      }
 })
 )
 function CityState(props){
    const [getImage,setImage]=useState({filename:"",bytes:''});
    const [getStateList,setStateList]=useState([]);
    const [getState,setState]=useState("");
    const [getCity,setCity]=useState("");
    const [getName,setName]=useState("");
    const [getAddressOne,setAddressOne]=useState("");
    const [getAddressTwo,setAddressTwo]=useState("");
    const [getLandmark,setLandmark]=useState("");
    const [getLatitude,setLatitude]=useState("");
    const [getLongitude,setLongitude]=useState("");
    const [getMobile,setMobile]=useState("");
    const [getEmail,setEmail]=useState("");
    // alert(getimage) 
    const getlanlong=()=>{
    
      Geocode.setApiKey("AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs");
var address=getName+","+getAddressOne+","+getCity+","+getState;
// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.fromAddress(`${address}`).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    setLatitude(lat)
    setLongitude(lng);
  },
  (error) => {
    console.error(error);
  }
);
    }
    const fetchstates=async()=>{
      var allstates=await fetchdata(`${ServerUrl}/stores/fetchstate`);
      //  var allstates=await fetchdata('https://gist.githubusercontent.com/Dhaneshmonds/1b0ca257b1c34e4842528dcb826ee880/raw/3a7d98354cc43158162eb47d990073105788f348/IndianStatesDistricts.json');
      setStateList(allstates.data);
      // alert(JSON.stringify(allstates.states))
      // setStateList(allstates.states);
    }
    const handelPicture=(event)=>{
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const FillState=()=>{
      return(
        getStateList.map((item)=>{

        
        return(
          <MenuItem value={item.stateid}>{item.statename}</MenuItem>
          // <MenuItem value={item.name}>{item.name}</MenuItem>
        )
      })
      )
    }
    useEffect(function(){
      fetchstates();
    },[])
      const handelClick=async()=>{
      var err=false
      var a=0
        if(isEmpty(getState)){
        ErrorMessage("State not we blank")
        err=true
      }
      if(isEmpty(getCity)){
        ErrorMessage("City not we blank")
        err=true
        a=1
      }
      if(!isAlphabets(getCity) && a!==1){
        ErrorMessage("Invalid City Name")
        err=true
        a=0
      }
      if(isEmpty(getName)){
        err=true
        ErrorMessage("Store not we blank")
      }
      if(isEmpty(getAddressOne)){
        err=true
        ErrorMessage("Address One not we blank")
      }
      if(isEmpty(getLandmark)){
        err=true
        ErrorMessage("Landmark not we blank")
      }
      if(isEmpty(getLatitude)){
        err=true
        ErrorMessage("Latitude not we blank")
      }
      if(isEmpty(getLongitude)){
        err=true
        ErrorMessage("Longitude not we blank")
      }
      if(isEmpty(getMobile)){
        err=true
        ErrorMessage("Contact Number not we blank")
        a=1
      }
      if(!isMobile(getMobile) && a!==1){
        err=true
        a=0
        ErrorMessage("Invalid Contact Number")
      }
      if(isEmpty(getEmail)){
        err=true
        a=1
        ErrorMessage("Email not we blank")
      }
      if(!isEmail(getEmail) && a!==1){
        err=true
        ErrorMessage("Invalid Contact Number")
        a=0
      }
      if(isEmpty(getImage.filename)){
        err=true
        ErrorMessage("Please Choose Shop Image")
      }
      if(!err){
        var formdata=new FormData();
      formdata.append("shopname",getName);
      formdata.append("city",getCity);
      formdata.append("state",getState);
      formdata.append("mobile",getMobile);
      formdata.append("email",getEmail);
      formdata.append("addressone",getAddressOne);
      formdata.append("addresstwo",getAddressTwo);
      formdata.append("landmark",getLandmark);
      formdata.append("latitude",getLatitude);
      formdata.append("longitude",getLongitude);
      formdata.append("picture",getImage.bytes);
      var config={"content-type":"multipart/form-data"}
      var result=await insertDataImage('stores/insertdata',formdata,config);
      if(result){
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Record",
          text: "Submitted successfully",
          icon: "success",
        });
      
      }
      else{
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Record",
          text: "Not Submitted",
          icon: "warning",
          dangerMode: true,
        });
      }}
    }
    var classes=useStyles()
    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.heading}>
                  <spam><img alt="..."   src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Add Store's
                  </spam></Grid>
                <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">State</InputLabel>
        <Select
          labelId="State_Label"
          id="state"
          // value={'Madhya Pradesh'}
          label="State"
          onChange={(event)=>setState(event.target.value)}
        >
          {FillState()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6} style={{padding:10}}>
        <TextField variant="outlined" label="City" fullWidth onChange={(event)=>setCity(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Store Name" fullWidth onChange={(event)=>setName(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Address 1" fullWidth onChange={(event)=>setAddressOne(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Address 2 (Optional)" fullWidth onChange={(event)=>setAddressTwo(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Landmark" fullWidth onChange={(event)=>setLandmark(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="outlined" label="Latitude" value={getLatitude} fullWidth onChange={(event)=>setLatitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="outlined" value={getLongitude} label="Longitude" fullWidth onChange={(event)=>setLongitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth style={{background:'green',height:55,borderRadius:10}} onClick={()=>getlanlong()} >Get Location</Button>
        </Grid>
        <Grid item xs={6}>
        <TextField variant="outlined" label="Contact Number" fullWidth onChange={(event)=>setMobile(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
        <TextField variant="outlined" label="Email Address" fullWidth onChange={(event)=>setEmail(event.target.value)} />
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
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Add Store</Button>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}
export default CityState;