import React from 'react';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import {makeStyles,Grid,Avatar,FormControl,InputLabel,Select,MenuItem,Button,TextField} from '@material-ui/core';
import MaterialTable from 'material-table';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {isEmpty,ErrorMessage} from '../checks'
import {fetchdata, ServerUrl,postData, insertDataImage} from '../fetchfromnode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import swal from '@sweetalert/with-react'
import AddFinalProduct from './AddFinalProduct';
import AddProduct from './AddProduct';
import AddIcon from '@material-ui/icons/Add'
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
export default function DisplyAllProduct(props){
  DisplyAllProduct.modules = {
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
  DisplyAllProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
    const classes=useStyles();
    const [iopen, setiOpen] = useState(false);
    const [eopen, seteOpen] = useState(false);
    const [getProductId, setProductId] = useState("");
    const [url,setUrl]=useState("")
    const [getProductList,setProductList]=useState([]);
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
    const [getDiscription,setDiscription]=useState("");
    const [getOldImage,setOldImage]=useState("");
    const [getBtnStatus,setBtnStatus]=useState(false)
    const [getStatus,setStatus]=useState("");
    const [getAdd,setAdd]=useState("");
    const handelPicture=(event)=>{
      setOldImage(getImage.filename);
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true);
    }
    const fetchProduct=async()=>{
      var result=await fetchdata(`${ServerUrl}/products/getdata`);
      result=await result.data
      setProductList(result);
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
      // eslint-disable-next-line
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
      var body={"productname":getName,"status":getStatus,"adv":getAdd,"type":getType,"shapeid":getShape,"discription":getDiscription,"materialid":getMaterial,"productid":getProductId,"frameid":getFrame,"categoryid":getCategory}
      var result=await postData('products/updatedata',body);
      if(result){
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product",
          text: "Update successfully",
          icon: "success",
        });
        
      }
      else{
        swal(
          <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
          ,{
          title: "Your Product",
          text: "Failed To Update",
          icon: "error",
          dangerMode: true,
        });
      }}
      handleeClose();
      fetchProduct();
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
      setProductId(a.productid);
      setName(a.productname);
      setFrame(a.frameid);
      setMaterial(a.materialid)
      setCategory(a.categoryid)
      setShape(a.shapeid)
      setType(a.type);
      setAdd(a.adv);
      setStatus(a.status)
      setImage({filename:`${ServerUrl}/images/${a.picture}`});
      setDiscription(a.discription);
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
    formdata.append("id",getProductId)
    formdata.append("picture",getImage.bytes);
    formdata.append("oldpicture",getOldImage);
    var config={"content-type":"multipart/form-data"}
    var result=await insertDataImage('products/updateimage',formdata,config);
    if(result){
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Product Image",
        text: "Update successfully",
        icon: "success",
      });
    }
    else{
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Product Image",
        text: "Not Update successfully",
        icon: "error",
        dangerMode: true,
      });
    }
    setBtnStatus(false)
    seteOpen(false);
    fetchProduct();
    }
    const EditDialogBox=()=>{    
      // alert(getCategory.name)
      return (
        <div>
          <Dialog fullWidth open={eopen} onClose={handleeClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              <Grid container spacing={1}>
              <Grid item xs={12} className={classes.heading}>
                  <spam><img alt="..."   src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Edit Product
                  </spam></Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
            <div className={classes.droot}>
            <div className={classes.dsubdiv}>
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <TextField variant="outlined" value={getName}  fullWidth label="Product Name" onChange={(event)=>setName(event.target.value)} />
                    </Grid>
        <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Category</InputLabel>
        <Select
          labelId="State_Label"
          id="category"
          value={getCategory}
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
          value={getType}
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
          value={getMaterial}
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
          value={getFrame}
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
          value={getShape}
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
          value={getStatus}
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
          value={getAdd}
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
        {!getBtnStatus?<><input
        
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(event)=>handelPicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" className={classes.items} color="primary" component="span">
          Edit Product Picture
        </Button>
      </label></>:<div><Button variant="contained" color="primary" className={classes.items} style={{paddingRight:30}} onClick={()=>handleImageSave()} >Save</Button><Button className={classes.items}  variant="contained" style={{marginLeft:20}} color="primary" onClick={()=>handleCancel()} >Cancel</Button></div>}
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Edit Product</Button>
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
    useEffect(function(){
        fetchProduct();
    },[]);
    const handledelete=async(x)=>{
      var productid=x.productid;
      Swal.fire(
        {
        imageUrl:"/lenslogo.png",
        imageWidth:100,
        imageHeight:50,
        title: 'IndoForest\nAre you sure?',
        text: 'You will not be able to recover this Product record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(async(result) => {
        if (result.isConfirmed) {
          result=await postData("products/deleteproduct",{id:productid})
          if(result){
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Product",
              text: "Deleted successfully",
              icon: "success",
            });
          }
          else{
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Product",
              text: "Failed to delete",
              icon: "error",
              dangerMode: true,
            });
          }
          fetchProduct();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your Product is safe',
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
  onClick={()=>props.setComponent(<AddProduct/>)}
>
  Add Product
</Button>
        </div>}
            columns={[
              { title: 'Id', field: 'productid' },
              { title: 'Name',field:'productname'},
              { title: 'Category',field:'categoryname'},
              { title: 'Attribute',field:'type',render:x=>(<div><table padding={10}><tr><th>Shape</th><th>{x.shapename}</th></tr><tr><th>Material</th><th>{x.materialname}</th></tr><tr><th>Frame</th><th>{x.framename}</th></tr><tr><th>Type</th><th>{x.type}</th></tr></table></div>)},
              { title: 'Status/Advertisment',field:'status',render:x=>(<div><b>{x.status}</b><br/><b>{x.adv}</b></div>)},
              { title: 'Picture',render:x=>(<div><img alt="..."   style={{width:80,height:80,borderRadius:10}} src={`${ServerUrl}/images/${x.picture}`} onClick={()=>handleiClickOpen(`${ServerUrl}/images/${x.picture}`)} /></div>)},
            ]}
            data={getProductList}        
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Color',
                onClick: (event, x) =>props.setComponent(<AddFinalProduct id={x.productid} />)
              },{
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, x) =>handleeClickOpen(x)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
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