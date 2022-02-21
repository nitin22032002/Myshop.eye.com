import React from 'react';
import { useState,useEffect } from 'react';
import swal from '@sweetalert/with-react'
import {fetchdata,insertDataImage,ServerUrl} from "../fetchfromnode"
import {makeStyles,Button,Grid,Select,Avatar,InputLabel,FormControl,MenuItem,TextField} from '@material-ui/core';
import {isEmpty,ErrorMessage} from '../checks'
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
 function AddProduct(props){
  AddProduct.modules = {
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
  AddProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
    const [getImage,setImage]=useState({filename:"",bytes:''});
    const [getFrameList,setFrameList]=useState([]);
    const [getCategoryList,setCategoryList]=useState([]);
    const [getMaterialList,setMaterialList]=useState([]);
    const [getShapeList,setShapeList]=useState([]);
    const [getFrame,setFrame]=useState("");
    const [getMaterial,setMaterial]=useState("");
    const [getCategory,setCategory]=useState("");
    const [getShape,setShape]=useState("");
    const [getType,setType]=useState("");
    const [getName,setName]=useState("");
    const [getStatus,setStatus]=useState("");
    const [getAdd,setAdd]=useState("");
    const [getDiscription,setDiscription]=useState("");
    const handelPicture=(event)=>{
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const FillFrame=()=>{
        return(
          getFrameList.map((item)=>{
          return(
            <MenuItem value={item.frameid}><div style={{display:'flex',flexDirection:"row"}}>     {item.framename}
              
            <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src={`${ServerUrl}/images/${item.adpicture}`} />
            </div></MenuItem>
          )
        })
        )
      }
    const FillShape=()=>{
      return(
        getShapeList.map((item)=>{
        return(
          <MenuItem value={item.shapeid}><div style={{display:'flex',flexDirection:"row"}}>     {item.shapename}
              
          <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src={`${ServerUrl}/images/${item.adpicture}`} />
          </div></MenuItem>
        )
      })
      )
    }
    const FillMaterial=()=>{
        return(
          getMaterialList.map((item)=>{
          return(
            <MenuItem value={item.materialid}>
           <div style={{display:'flex',flexDirection:"row"}}>     {item.materialname}
              
            <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src={`${ServerUrl}/images/${item.adpicture}`} />
            </div>
            </MenuItem>
          )
        })
        )
      }
      const FillCategory=()=>{
        return(
          getCategoryList.map((item)=>{
          return(
            <MenuItem value={item.categoryid}><div style={{display:'flex',flexDirection:"row"}}>     {item.categoryname}
              
            <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src={`${ServerUrl}/images/${item.adpicture}`} />
            </div></MenuItem>
          )
        })
        )
      }
      const fetchFrame=async()=>{
        var result=await fetchdata(`${ServerUrl}/attribute/fetchshape?a=frames`);
      result=await result.data
        setFrameList(result);
    }
      const fetchShape=async()=>{
        var result=await fetchdata(`${ServerUrl}/attribute/fetchshape?a=shapes`);
        result=await result.data
        setShapeList(result);
    }
    const fetchMaterial=async()=>{
        var result=await fetchdata(`${ServerUrl}/attribute/fetchshape?a=materials`);
         result=await result.data
        setMaterialList(result);
    }
    const fetchCategory=async()=>{
        var result=await fetchdata(`${ServerUrl}/category/fetchcategory`);
        result=await result.data
        setCategoryList(result);
    }
    useEffect(function(){
      fetchShape();
      fetchMaterial();
      fetchCategory();
      fetchFrame();
    },[])
      const handelClick=async()=>{
      var err=false
        if(isEmpty(getName)){
        ErrorMessage("Product Name not we blank")
        err=true
      }
      if(isEmpty(getCategory)){
        ErrorMessage("Product Category we blank")
        err=true
      }
      if(isEmpty(getType)){
        ErrorMessage("Product Type not we blank")
        err=true
      }
      if(isEmpty(getMaterial)){
        err=true
        ErrorMessage("Product Material not we blank")
      }
      if(isEmpty(getFrame)){
        err=true
        ErrorMessage("Product Frame not we blank")
      }
      if(isEmpty(getShape)){
        err=true
        ErrorMessage("Product Shape not we blank")
      }
      if(isEmpty(getStatus)){
        err=true
        ErrorMessage("Please Select Product Status")
      }
      if(isEmpty(getAdd)){
        err=true
        ErrorMessage("Please Select Advertisment Status")
      }
      if(isEmpty(getImage.filename)){
        err=true
        ErrorMessage("Please Choose Shop Image")
      }
      if(!err){
        var formdata=new FormData();
      formdata.append("productname",getName);
      formdata.append("frameid",getFrame);
      formdata.append("categoryid",getCategory);
      formdata.append("materialid",getMaterial);
      formdata.append("shapeid",getShape);
      formdata.append("type",getType);
      formdata.append("status",getStatus);
      formdata.append("adv",getAdd);
      formdata.append("discription",getDiscription);
      formdata.append("picture",getImage.bytes);
      var config={"content-type":"multipart/form-data"}
      var result=await insertDataImage('products/insertdata',formdata,config);
      if(result){
        swal(
          <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product",
          text: "Added successfully",
          icon: "success",
        });
        
      }
      else{
        swal(
          <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product",
          text: "Failed To Add",
          icon: "error",
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
                  <spam><img alt="..."  src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Add Product
                  </spam></Grid>
                    <Grid item xs={12}>
                    <TextField variant="outlined"  fullWidth label="Product Name" onChange={(event)=>setName(event.target.value)} />
                    </Grid>
        <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Category</InputLabel>
        <Select
          labelId="State_Label"
          id="category"
          // value={'Madhya Pradesh'}
          label="Category"
          onChange={(event)=>setCategory(event.target.value)}
        >
          {FillCategory()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Type</InputLabel>
        <Select
          labelId="State_Label"
          id="type"
          // value={'Madhya Pradesh'}
          label="type"
          onChange={(event)=>setType(event.target.value)}
        >
          <MenuItem value="men"><div style={{display:'flex',flexDirection:"row"}}>    Men
              
              <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src="/menlogo.png" />
              </div></MenuItem>
          <MenuItem value="women"><div style={{display:'flex',flexDirection:"row"}}>     Women
              
              <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{marginLeft:50,width:40,height:30}} src="/womenlogo.jpg" />
              </div></MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Material</InputLabel>
        <Select
          labelId="State_Label"
          id="material"
          // value={'Madhya Pradesh'}
          label="Material"
          onChange={(event)=>setMaterial(event.target.value)}
        >
          {FillMaterial()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Frame</InputLabel>
        <Select
          labelId="State_Label"
          id="frame"
          // value={'Madhya Pradesh'}
          label="Frame"
          onChange={(event)=>setFrame(event.target.value)}
        >
          {FillFrame()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Shape</InputLabel>
        <Select
          labelId="State_Label"
          id="shape"
          // value={'Madhya Pradesh'}
          label="Shape"
          onChange={(event)=>setShape(event.target.value)}
        >
          {FillShape()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Status</InputLabel>
        <Select
          labelId="State_Label"
          id="status"
          // value={'Madhya Pradesh'}
          label="Status"
          onChange={(event)=>setStatus(event.target.value)}
        >
          <MenuItem value="Treanding">Treanding</MenuItem>
          <MenuItem value="New Arrival">New Arrival</MenuItem>
          <MenuItem value="Best Seller">Best Seller</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Advertisment</InputLabel>
        <Select
          labelId="State_Label"
          id="adv"
          // value={'Madhya Pradesh'}
          label="Advertisment"
          onChange={(event)=>setAdd(event.target.value)}
        >
          <MenuItem value="Active">Avtive</MenuItem>
          <MenuItem value="Deactive">Deavtive</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
             
        <ReactQuill
            value={getDiscription} 
            modules={AddProduct.modules}
            formats={AddProduct.formats}
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
          Upload Product Picture
        </Button>
      </label>
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Add Product</Button>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}
export default AddProduct;