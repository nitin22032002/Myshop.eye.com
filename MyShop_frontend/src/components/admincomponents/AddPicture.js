import React,{useState} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { Button ,Grid,makeStyles} from '@material-ui/core'
import swal from '@sweetalert/with-react'
import { insertDataImage } from '../fetchfromnode'
import { ErrorMessage } from '../checks'
const useStyle=makeStyles((theme)=>({
    main:{display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    margin:20},
    sub:{padding:20,
        background:'#fff',
        height:'auto',
        width:1000},
    heading:{
            padding:10,
            textAlign:'center',
            fontSize:30,
            fontWeight:'bold',
        },
}))
export default function AddProductPicture(props){
    const classes=useStyle();
    const [getPictureList,setPictureList]=useState([]);
    const [getFinalProductId,setFinalProductId]=useState(props.id)
    const handlePicture=(files)=>{
        setPictureList(files)
    }
    if(getFinalProductId===""){
        setFinalProductId(props.id)
    }
    const UploadPicture=async()=>{
        if(getPictureList.length===0){
            ErrorMessage("Please select atleast one picture")
        }
        else{
        var formdata=new FormData();
        formdata.append("finalid",getFinalProductId);
         getPictureList.map((item,index)=>{
             formdata.append("picture"+index,item);
             return ""
         })
        var config={'content-type':'multipart/form-data'}
        var result=await insertDataImage('finalproduct/addpictures',formdata,config);
        if(result){
            swal(
        <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
        ,{
        title: "Your Picture",
        text: "successfully Uploaded",
        icon: "success",
            })
        }
        else{
            swal(
                <div><img alt="..."  src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3>
                <h3 style={{color:'red'}}>Server Error...</h3></div>
                ,{
                title: "Your picture",
                text: "Failed To Upload try again..",
                icon: "error",
                    })
        }    }
    }
    return(
        <div className={classes.main}>
            <div className={classes.sub}>
                <Grid container>
                <Grid item xs={12} className={classes.heading}>
                  <spam><img alt="..."  src="/lenslogo.png" style={{width:40,height:20}} /></spam> <spam className={classes.heading}>Add Product Pictures
                  </spam></Grid>
                    <Grid xs={12}>
                        <DropzoneArea
                        dropzoneText="Drag and Drop Your Product Picture Here or Click"
                        filesLimit={10}
                        showPreviews={true}
                        maxFileSize={100000000}
                        
                        acceptedFiles={['image/jpeg','image/png','image/ico','image/bmp']}
                        onChange={(files)=>handlePicture(files)}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Button fullWidth variant="outlined" style={{padding:10,marginTop:10,background:"#636e72",color:'#fff'}} color="primary" onClick={()=>UploadPicture()}>Upload Picture</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}