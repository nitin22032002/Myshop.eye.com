import React from 'react';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import {makeStyles,Grid,Avatar,FormControl,InputLabel,Select,MenuItem,Button,TextField} from '@material-ui/core';
import MaterialTable from 'material-table';
import {isEmpty,ErrorMessage,isDigit} from '../checks'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import AddProductPicture from './AddPicture';
import {fetchdata, ServerUrl,postData, insertDataImage} from '../fetchfromnode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import swal from '@sweetalert/with-react'
import DisplayProductPicture from './DisplayProductPicture';
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
export default function DisplyAllFinalProduct(props){
  DisplyAllFinalProduct.modules = {
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
  DisplyAllFinalProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]  
  const classes=useStyles();
    const [iopen, setiOpen] = useState(false);
    const [eopen, seteOpen] = useState(false);
    const [getFinalProductId, setFinalProductId] = useState("");
    const [url,setUrl]=useState("")
    const [getProductList,setProductList]=useState([]);
    const [getImage,setImage]=useState({filename:"",bytes:''});
    const [getColorList,setColorList]=useState([]);
    const [getColorId,setColorId]=useState("");
    const [getSize,setSize]=useState("")
    const [getStock,setStock]=useState("");
    const [getPrice,setPrice]=useState("");
    const [getOfferType,setOfferType]=useState("");
    const [getOfferPrice,setOfferPrice]=useState("");
    const [getDiscription,setDiscription]=useState("");
    const [getOldImage,setOldImage]=useState("");
    const [getBtnStatus,setBtnStatus]=useState(false)
    const handelPicture=(event)=>{
      setOldImage(getImage.filename);
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true);
    }
    const fetchProduct=async()=>{
      var result=await fetchdata(`${ServerUrl}/finalproduct/getdata`);
       result=await result.data
      setProductList(result);
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
      fetchProduct();
      // eslint-disable-next-line
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
        if(!err){
        var body={size:getSize,finalproductid:getFinalProductId,colorid:getColorId,stock:getStock,price:getPrice,offertype:getOfferType,offerprice:getOfferPrice,discription:getDiscription}
        var result=await postData('finalproduct/updatedata',body);
        if(result){
          swal(
            <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
            ,{
            title: "Your Product Color",
            text: "Update successfully",
            icon: "success",
          });
          
        }
        else{
          swal(
            <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/></div>
            ,{
            title: "Your Product Color",
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
      setFinalProductId(a.finalproductid);
      setStock(a.stock)
      setSize(a.size);
      setPrice(a.price)
      setOfferType(a.offertype)
      setOfferPrice(a.offerprice)
      setColorId(a.colorid)
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
    formdata.append("id",getFinalProductId)
    formdata.append("picture",getImage.bytes);
    formdata.append("oldpicture",getOldImage);
    var config={"content-type":"multipart/form-data"}
    var result=await insertDataImage('finalproduct/updateimage',formdata,config);
    if(result){
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Color Product Image",
        text: "Update successfully",
        icon: "success",
      });
    }
    else{
      swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Color Product Image",
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
                  <spam><img alt="..."   src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Edit Product Color
                  </spam></Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
            <div className={classes.droot}>
            <div className={classes.dsubdiv}>
            <Grid container spacing={1}>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Color</InputLabel>
        <Select
          labelId="State_Label"
          id="color"
          value={getColorId}
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
          value={getSize}
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
            <TextField fullWidth value={getPrice} variant="outlined" label="Price" onChange={(event)=>setPrice(event.target.value)}/>
        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth variant="outlined" value={getStock} label="Stock" onChange={(event)=>setStock(event.target.value)}/>
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="State_Label">Offer Type</InputLabel>
        <Select
          labelId="State_Label"
          id="offertype"
          value={getOfferType}
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
            <TextField fullWidth value={getOfferPrice} variant="outlined" label="Offer Price" onChange={(event)=>setOfferPrice(event.target.value)}/>
        </Grid>
        <Grid item xs={12}>
        <ReactQuill
            value={getDiscription} 
            modules={DisplyAllFinalProduct.modules}
            formats={DisplyAllFinalProduct.formats}
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
          Edit Color Picture
        </Button>
      </label></>:<div><Button variant="contained" color="primary" className={classes.items} style={{paddingRight:30}} onClick={()=>handleImageSave()} >Save</Button><Button className={classes.items}  variant="contained" style={{marginLeft:20}} color="primary" onClick={()=>handleCancel()} >Cancel</Button></div>}
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  variant="rounded" src={getImage.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{background:"#636e72",color:'#fff'}} fullWidth onClick={()=>handelClick()}>Edit Product Color</Button>
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
      var finalproductid=x.finalproductid;
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
          result=await postData("finalproduct/deleteproduct",{id:finalproductid})
          if(result){
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Product color",
              text: "Deleted successfully",
              icon: "success",
            });
          }
          else{
            swal(
              <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
              ,{
              title: "Your Product color",
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
            'Your Product color is safe',
            'error'
          )
        }
      })
    }
    function SimpleAction() {
        return (
            
          <MaterialTable
            title="Our Final Product"
            columns={[
              { title: 'Final Product Id/Product Id',field:'productid',render:x=>(<><b>{x.finalproductid}</b><br/><b>{x.productid}</b></>)},
              { title: 'Product Name',field:'productname'},
              { title: 'Color',field:'colorname'},
              { title: 'Size',field:'size'},
              { title: 'Price',field:'price'},
              { title: 'Stock',field:'stock'},
              { title: 'Offer',field:'offertype',render:x=>(<div><b>{x.offertype}</b><br/>{x.offerprice} Rs</div>)},
              { title: 'Picture',render:x=>(<div><img alt="..."   style={{width:80,height:80,borderRadius:10}} src={`${ServerUrl}/images/${x.picture}`} onClick={()=>handleiClickOpen(`${ServerUrl}/images/${x.picture}`)} /></div>)},
            ]}
            data={getProductList}        
            actions={[
              {
                icon: 'add',
                tooltip: 'Add More Pictures',
                onClick: (event, x) =>props.setComponent(<AddProductPicture id={x.finalproductid}/>)
              },
              {
                icon: 'home',
                tooltip: 'Display Product Pictures',
                onClick: (event, x) =>props.setComponent(<DisplayProductPicture id={x.finalproductid}/>)
              },
              {
                icon: 'edit',
                tooltip: 'Edit Color',
                onClick: (event, x) =>handleeClickOpen(x)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Color',
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