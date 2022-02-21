import React from 'react';
import { useState,useEffect } from 'react';
import swal from '@sweetalert/with-react'
import {fetchdata,insertDataImage,postData,ServerUrl} from "../fetchfromnode"
import {makeStyles,Button,Grid,Select,Avatar,InputLabel,FormControl,MenuItem,TextField} from '@material-ui/core';
import {isEmpty,isDigit,ErrorMessage} from '../checks'
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
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
 function AddFinalProduct(props){
  AddFinalProduct.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  AddFinalProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
    const [getImage,setImage]=useState({filename:"",bytes:''});
    const [getColorList,setColorList]=useState([]);
    const [getProductId,setProductId]=useState(props.id);
    const [getColorId,setColorId]=useState("");
    const [getSize,setSize]=useState("")
    const [getStock,setStock]=useState("");
    const [getPrice,setPrice]=useState("");
    const [getOfferType,setOfferType]=useState("");
    const [getOfferPrice,setOfferPrice]=useState("");
    const [getDiscription,setDiscription]=useState("");
    const handelPicture=(event)=>{
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    if(getProductId===""){
      setProductId(props.id)
    }
    const FillColor=()=>{
      return(
        getColorList.map((item)=>{
        return(
          <MenuItem value={item.colorid}><div style={{display:'flex',flexDirection:"row"}}>     {item.colorname}
              
          <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src={`${ServerUrl}/images/${item.adpicture}`} />
          </div></MenuItem>
        )
      })
      )
    }
      const fetchColor=async()=>{
        var result=await fetchdata(`${ServerUrl}/attribute/fetchshape?a=colors`);
        result=await result.data
        setColorList(result);
    }
    useEffect(function(){
     fetchColor();
    },[])
      const handelClick=async()=>{
      var err=false
      var a=0;
        if(isEmpty(getColorId)){
        ErrorMessage("Product Color not we blank")
        err=true
      }
      if(isEmpty(getSize)){
        ErrorMessage("Product Size we blank")
        err=true
      }
      if(isEmpty(getStock)){
        ErrorMessage("Product Stock Not we blank")
        err=true
        a=1;
      }
      if(!isDigit(getStock) && a===0){
        ErrorMessage("Product Stock Must Be positive integer value")
        err=true
        a=0;
      }
      if(isEmpty(getPrice)){
        ErrorMessage("Product Price not we blank")
        err=true
        a=1
      }
      if(!isDigit(getPrice) && a===0){
        ErrorMessage("Product Price Must Be positive integer value")
        err=true
        a=0;
      }
      if(isEmpty(getOfferType)){
        ErrorMessage("Product Offer Type not we blank")
        err=true
      }
      if(isEmpty(getOfferPrice)){
        ErrorMessage("Product Offer Price not we blank")
        err=true
        a=1
      }
      if(!isDigit(getOfferPrice) && a===0){
        ErrorMessage("Product Offer Price Must Be positive integer value")
        err=true
        a=0;
      }
      if(isEmpty(getImage.filename)){
        err=true
        ErrorMessage("Please Choose Shop Image")
      }
      if(!err){
        var result=await postData('finalproduct/checkexist',{pid:getProductId,cid:getColorId,size:getSize});
        if(result){
        var formdata=new FormData();
      formdata.append("productid",getProductId);
      formdata.append("colorid",getColorId);
      formdata.append("size",getSize);
      formdata.append("stock",getStock);
      formdata.append("price",getPrice);
      formdata.append("offertype",getOfferType);
      formdata.append("offerprice",getOfferPrice);
      formdata.append("discription",getDiscription);
      formdata.append("picture",getImage.bytes);
      var config={"content-type":"multipart/form-data"}
      result=await insertDataImage('finalproduct/insertdata',formdata,config);
      if(result){
        swal(
          <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product Color",
          text: "Added successfully",
          icon: "success",
        });
        
      }
      else{
        swal(
          <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product Color",
          text: "Failed To Add",
          icon: "warning",
          dangerMode: true,
        });
      }}
    else{
      ErrorMessage("Product Already Exist !")
    }
    }
    }
    var classes=useStyles()
    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.heading}>
                  <spam><img alt="..."  src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Add Product Color
                  </spam></Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Color</InputLabel>
        <Select
          labelId="State_Label"
          id="color"
          // value={'Madhya Pradesh'}
          label="Color"
          onChange={(event)=>setColorId(event.target.value)}
        >
          {FillColor()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Size</InputLabel>
        <Select
          labelId="State_Label"
          id="size"
          // value={'Madhya Pradesh'}
          label="Size"
          onChange={(event)=>setSize(event.target.value)}
        >
          <MenuItem value="Small">Small</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Large">Large</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6} >
            <TextField fullWidth variant="outlined" label="Price" onChange={(event)=>setPrice(event.target.value)}/>
        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth variant="outlined" label="Stock" onChange={(event)=>setStock(event.target.value)}/>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Offer Type</InputLabel>
        <Select
          labelId="State_Label"
          id="offertype"
          // value={'Madhya Pradesh'}
          label="Offer Type"
          onChange={(event)=>setOfferType(event.target.value)}
        >
          <MenuItem value="Festival">Festival</MenuItem>
          <MenuItem value="Company">Company</MenuItem>
          <MenuItem value="End of Month">End of Month</MenuItem>
          <MenuItem value="Sale">Sale</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{padding:10}}>
            <TextField fullWidth variant="outlined" label="Offer Price" onChange={(event)=>setOfferPrice(event.target.value)}/>
        </Grid>
        <Grid item xs={12}>
        <ReactQuill
            value={getDiscription} 
            modules={AddFinalProduct.modules}
            formats={AddFinalProduct.formats}
            onChange={(txt)=>setDiscription(txt)} />

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
          Upload Product Color Picture
        </Button>
      </label>
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Add Product Color</Button>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}
export default AddFinalProduct;