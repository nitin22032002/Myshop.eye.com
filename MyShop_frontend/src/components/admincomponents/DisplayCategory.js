import React from 'react'
import MaterialTable from 'material-table';
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2'
import {Grid,Button,TextField,Avatar,makeStyles} from '@material-ui/core'
import swal from '@sweetalert/with-react';
import { isEmpty,ErrorMessage } from '../checks';
import {fetchdata,postData,insertDataImage,ServerUrl} from '../fetchfromnode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCategory from './AddCategory'
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
       width:800,
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
export default function DisplayAllCategory(props){
    const classes=useStyles();
    const [getCategoryList,setCategoryList]=useState([]);
    const [getCategoryName,setCategoryName]=useState("")
    const [getOldPicture,setOldPicture]=useState('')
    const [getiOpen,setiOpen]=useState({url:'',status:false})
    const [geteOpen,seteOpen]=useState(false)
    const [getBtnStatus,seteBtnStatus]=useState(false)
    const [getPicture,setPicture]=useState({filename:"",bytes:""});
    const [getCategoryId,setCategoryId]=useState("")
    const fetchcategory=async()=>{
        var result=await fetchdata(`${ServerUrl}/category/fetchcategory`);
        result=await result.data
        setCategoryList(result);
    }
    const handelPicture=(event)=>{
        seteBtnStatus(true)
        setOldPicture(getPicture.filename)
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    useEffect(function(){
        fetchcategory();
        // eslint-disable-next-line
    },[])
    const handelClick=async()=>{
        var err=false;
         if(isEmpty(getCategoryName)){
             ErrorMessage("Category Name Not be Empty")
             err=true
         }
         if(isEmpty(getPicture.filename)){
             ErrorMessage("Category Image Not Be Empty")
             err=true;
         }
         if(!err){
             var body={id:getCategoryId,name:getCategoryName}
           
             var result=await postData("category/updatedata",body);
             if(result){
                 swal(
             <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
             ,{
             title: "Your Record",
             text: "successfully Updated",
             icon: "success",
                 })
             }
             else{
                 swal(
                     <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3>
                     <h3 style={{color:'red'}}>Server Error...</h3></div>
                     ,{
                     title: "Your Record",
                     text: "Failed To Update try again..",
                     icon: "error",
                         })
             }
             seteBtnStatus(false)
            seteOpen(false)
            fetchcategory();
         }
     }
    const handledelete=async(x)=>{
        var id=x.categoryid
        var img=x.adpicture;
        Swal.fire(
            {
            imageUrl:"/lenslogo.png",
            imageWidth:100,
            imageHeight:50,
            title: 'IndoForest\nAre you sure?',
            text: 'You will not be able to recover this Category record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
            if (result.isConfirmed) {
              result=await postData("category/deletecategory",{id:id,img:img})
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
              fetchcategory();
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
    const handleeClickOpen=(x)=>{
        seteOpen(true);
        setCategoryId(x.categoryid);
        setCategoryName(x.categoryname)
        setPicture({filename:`${ServerUrl}/images/${x.adpicture}`,bytes:""})
    }
    const handleiClickOpen=(x)=>{
        setiOpen({url:x,status:true})
    }
    const handleeClickClose=()=>{
        seteOpen(false);
    }
    const handleiClickClose=()=>{
        setiOpen({url:"",status:false})
    }
    const handleCancel=()=>{
        setPicture({filename:getOldPicture,bytes:""})
        seteBtnStatus(false)
    }
    const handleImageSave=async()=>{
        var formdata=new FormData();
        formdata.append("id",getCategoryId)
        formdata.append("picture",getPicture.bytes)
        formdata.append('oldpicture',getOldPicture)
        var config={"content-type":"multipart/form-data"}
        var result=await insertDataImage('category/updatepicture',formdata,config);
        if(result){
            swal(
        <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Category Picture",
        text: "successfully Updated",
        icon: "success",
            })
        }
        else{
            swal(
                <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3>
                <h3 style={{color:'red'}}>Server Error...</h3></div>
                ,{
                title: "Category Picture",
                text: "Failed To Update try again..",
                icon: "error",
                    })
        }
        fetchcategory();
        seteBtnStatus(false)
        seteOpen(false)
        }
    const EditDialogBox=()=>{    
        return (
          <div>
            <Dialog open={geteOpen} onClose={handleeClickClose} aria-labelledby="form-dialog-title">
              <DialogContent>
              <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container>     <Grid item xs={12}>
                        <h3 className={classes.heading}><img alt="..."   src="/lenslogo.png" style={{width:50,height:20}} /> Edit Category</h3>
                    </Grid>               <Grid item xs={12}>
                        <TextField value={getCategoryName} variant="outlined" className={classes.items} label="Category Name" fullWidth onChange={(event)=>setCategoryName(event.target.value)} />
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
          Edit
        </Button>
      </label></>:<div><Button variant="contained" color="primary" className={classes.items} style={{paddingRight:30}} onClick={()=>handleImageSave()} >Save</Button><Button className={classes.items}  variant="contained" style={{marginLeft:20}} color="primary" onClick={()=>handleCancel()} >Cancel</Button></div>}
        </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Avatar alt="Your Image Not Uploaded"  className={classes.items} style={{height:50,width:50}}  variant="rounded" src={getPicture.filename} />
        </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"  className={classes.items} style={{background:"#636e72",color:'#55E6C1'}} fullWidth onClick={()=>handelClick()}>Edit Category</Button>
                </Grid>

                </Grid>
            </div>
        </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleeClickClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
    const ImageDialogBox=()=>{    
        return (
          <div>
            <Dialog open={getiOpen.status} onClose={handleiClickClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Picture</DialogTitle>
              <DialogContent>
                <img alt="..."   src={getiOpen.url} style={{width:500,height:500,borderRadius:20}}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleiClickClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
    const ShowCategoryTable=()=>{
        return (
            
            <MaterialTable
            title={<div style={{padding:2}}>
            <Button
    variant="contained"
    color="primary"
    size="meadium"
    startIcon={<AddIcon/>}
    onClick={()=>props.setComponent(<AddCategory/>)}
  >
    Add Category
  </Button>
          </div>}
              columns={[
                { title: 'Id', field: 'categoryid' },
                { title: 'Category Name',field:'categoryname'},
                { title: 'Picture',render:x=>(<div><img alt="..."   style={{width:80,height:80,borderRadius:10}} src={`${ServerUrl}/images/${x.adpicture}`} onClick={()=>handleiClickOpen(`${ServerUrl}/images/${x.adpicture}`)} /></div>)},
              ]}
              data={getCategoryList}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Category',
                  onClick: (event, x) =>handleeClickOpen(x)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Category',
                  onClick: (event, x) =>handledelete(x)
                }
              ]} />)
        }
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    {ShowCategoryTable()}
                    {ImageDialogBox()}
                    {EditDialogBox()}
                </div>
            </div>
        )
}