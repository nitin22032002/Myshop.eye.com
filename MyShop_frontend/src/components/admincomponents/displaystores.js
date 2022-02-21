import React from 'react';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import {makeStyles,Grid,Avatar,FormControl,InputLabel,Select,MenuItem,Button,TextField} from '@material-ui/core';
import MaterialTable from 'material-table';
import {isEmpty,isAlphabets,isEmail,isMobile,ErrorMessage} from '../checks'
import {fetchdata, ServerUrl,postData, insertDataImage} from '../fetchfromnode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import swal from '@sweetalert/with-react'
import AddIcon from '@material-ui/icons/Add'
import CityState from './storelocator'
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
       width:1000
    },
    droot:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    dsubdiv:{

        padding:10,
       height:'auto',
       width:1300
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
export default function DisplyAllStores(props){
    const classes=useStyles();
    const [iopen, setiOpen] = useState(false);
    const [eopen, seteOpen] = useState(false);
    const [storeId, setStoreId] = useState("");
    const [url,setUrl]=useState("")
    const [getStoreList,setStoreList]=useState([]);
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
    const [getOldImage,setOldImage]=useState("");
    const [getBtnStatus,setBtnStatus]=useState(false)
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
      setOldImage(getImage.filename);
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true);
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
        var body={"shopname":getName,"storeid":storeId,"longitude":getLongitude,"latitude":getLatitude,"landmark":getLandmark,"addresstwo":getAddressTwo,"email":getEmail,"addressone":getAddressOne,"city":getCity,"state":getState,"mobile":getMobile}
      var result=await postData('stores/updatestore',body);
      if(result){
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Record",
          text: "Updated successfully",
          icon: "success",
        });
      }
      else{
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Record",
          text: "Not Updated",
          icon: "warning",
          dangerMode: true,
        });
      }
      handleeClose();
      fetchStore();
    }
    }
    const handleiClickOpen = (a) => {
      setiOpen(true);
      setUrl(a)
    };
  const handleiClose = () => {
      setiOpen(false);
      setUrl("")
    };
    const handleeClickOpen = (a) => {
      seteOpen(true);
      setStoreId(a.storeid);
      setName(a.storename);
      setState(a.storestate);
      setCity(a.storecity)
      setAddressOne(a.addressone)
      setAddressTwo(a.addresstwo);
      setLandmark(a.landmark)
      setLatitude(a.latitude)
      setLongitude(a.longitude)
      setMobile(a.contactnumber)
      setEmail(a.emailaddress)
      setImage({filename:`${ServerUrl}/images/${a.picture}`,bytes:""})
    };
  const handleeClose = () => {
      seteOpen(false);
      setUrl("")
    };
    const ImageDialogBox=()=>{    
      return (
        <div>
          <Dialog open={iopen} onClose={handleiClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Picture</DialogTitle>
            <DialogContent>
              <img alt="..."   src={url} style={{width:500,height:500,borderRadius:20}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleiClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    const handleCancel=()=>{
      setBtnStatus(false)
      setImage({filename:getOldImage,bytes:""});
    }
    const handleImageSave=async()=>{
    var formdata=new FormData();
    formdata.append("id",storeId)
    formdata.append("picture",getImage.bytes);
    formdata.append("oldpicture",getOldImage);
    var config={"content-type":"multipart/form-data"}
    var result=await insertDataImage('stores/updateimage',formdata,config);
    if(result){
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Store Image",
        text: "Update successfully",
        icon: "success",
      });
    }
    else{
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Store Image",
        text: "Not Update successfully",
        icon: "error",
        dangerMode: true,
      });
    }
    setBtnStatus(false)
    seteOpen(false);
    fetchStore();
    }
    const EditDialogBox=()=>{    
      return (
        <div>
          <Dialog fullWidth open={eopen} onClose={handleeClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              <Grid container spacing={1}>
              <Grid item xs={12} className={classes.heading}>
                  <spam><img alt="..."   src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Edit Store's
                  </spam></Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
            <div className={classes.droot}>
            <div className={classes.dsubdiv}>
            <Grid container spacing={1}>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">State</InputLabel>
        <Select
          labelId="State_Label"
          id="state"
         value={getState}
          label="State"
          onChange={(event)=>setState(event.target.value)}
        >
          {FillState()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6} style={{padding:10}}>
        <TextField variant="outlined" label="City" value={getCity} fullWidth onChange={(event)=>setCity(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Store Name" value={getName} fullWidth onChange={(event)=>setName(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Address 1" value={getAddressOne} fullWidth onChange={(event)=>setAddressOne(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Address 2 (Optional)" value={getAddressTwo} fullWidth onChange={(event)=>setAddressTwo(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField variant="outlined" label="Landmark" fullWidth value={getLandmark} onChange={(event)=>setLandmark(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="outlined" label="Latitude" fullWidth value={getLatitude} onChange={(event)=>setLatitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="outlined" label="Longitude" fullWidth value={getLongitude} onChange={(event)=>setLongitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth style={{background:'green',height:55,borderRadius:10}} onClick={()=>getlanlong()} >Get Location</Button>
        </Grid>
        <Grid item xs={6}>
        <TextField variant="outlined" label="Contact Number" value={getMobile} fullWidth onChange={(event)=>setMobile(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
        <TextField variant="outlined" label="Email Address" value={getEmail} fullWidth onChange={(event)=>setEmail(event.target.value)} />
        </Grid>
        <Grid item xs={6} style={{textAlign:'center'}}>
        {!getBtnStatus?<>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(event)=>handelPicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Edit Picture
        </Button>
      </label></>:<div><Button variant="contained" color="primary" style={{paddingRight:30}} onClick={()=>handleImageSave()} >Save</Button><Button  variant="contained" style={{marginLeft:20}} color="primary" onClick={()=>handleCancel()} >Cancel</Button></div>}
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Edit</Button>
                </Grid>
            </Grid>
            </div>
        </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleeClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    const fetchStore=async()=>{
        var data=await fetchdata(`${ServerUrl}/stores/fetchstores`);
        setStoreList(data.data)
    }
    useEffect(function(){
        fetchStore();
    },[]);
    const handledelete=async(x)=>{
      var storeid=x.storeid;
      Swal.fire(
        {
        imageUrl:"/lenslogo.png",
        imageWidth:100,
        imageHeight:50,
        title: 'IndoForest\nAre you sure?',
        text: 'You will not be able to recover this store record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(async(result) => {
        if (result.isConfirmed) {
          result=await postData("stores/deletestore",{id:storeid})
          if(result){
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Record",
              text: "Deleted successfully",
              icon: "success",
            });
          }
          else{
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Record",
              text: "Failed to delete",
              icon: "error",
              dangerMode: true,
            });
          }
          fetchStore();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your Record is safe',
            'error'
          )
        }
      })
    }
    function SimpleAction() {
        return (
            
          <MaterialTable
          title={<div style={{padding:2}}>
          <Button
  variant="contained"
  color="primary"
  size="meadium"
  startIcon={<AddIcon/>}
  onClick={()=>props.setComponent(<CityState/>)}
>
  Add Store
</Button>
        </div>}
            columns={[
              { title: 'Id', field: 'storeid' },
              { title: 'Name',field:'storename',
              render:x=>(<div><b>{x.storename}</b><br/>{x.addressone},{x.addresstwo}</div>)},
              { title: 'Contact Details',field:'contactnumber',render:x=>(<div>{x.contactnumber}<br/>{x.emailaddress}</div>)},
              { title: 'State/City',field:'storecity',render:x=>(<div>{x.storecity},{x.storestate}</div>)},
              { title: 'Location',render:x=>(<div><a href={`http://maps.google.com/maps?q=${x.latitude},${x.longitude}`} target="__blank" >Show</a></div>)},
              { title: 'Picture',render:x=>(<div><img alt="..."   style={{width:80,height:80,borderRadius:10}} src={`${ServerUrl}/images/${x.picture}`} onClick={()=>handleiClickOpen(`${ServerUrl}/images/${x.picture}`)} /></div>)},
            ]}
            data={getStoreList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Store',
                onClick: (event, x) =>handleeClickOpen(x)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Store',
                onClick: (event, x) =>handledelete(x)
              }
            ]}
          />
          
        )
      }
      return(
          <div className={classes.root} >
              <div className={classes.subdiv} >
                {SimpleAction()}
                {ImageDialogBox()}
                {EditDialogBox()}
              </div>
          </div>
      )
}