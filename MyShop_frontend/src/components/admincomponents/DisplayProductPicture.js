import React,{useEffect,useState} from 'react'
import { Grid,Button,Avatar,makeStyles} from '@material-ui/core'
import { insertDataImage, postData, ServerUrl} from '../fetchfromnode'
import swal from '@sweetalert/with-react'
import Swal from 'sweetalert2'
const useStyle=makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:20
    },
    subdiv:{

        padding:20,
       background:'#fff',
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
}))
export default function DisplayProductPicture(props){
    const classes=useStyle();
    const [getPictureList,setPictureList]=useState([]);
    const [getFinalProductId,setFinalProductId]=useState(props.id)
    const [getPictureId,setPictureId]=useState("")
    const [getPicture,setPicture]=useState({filename:"",bytes:""});
    const [getItem,setItem]=useState({});
    const [getOldPicture,setOldPicture]=useState("");
    if(getFinalProductId===""){
      setFinalProductId(props.id)
    }
    const fetchPicture=async()=>{
        var result=await postData("finalproduct/displayproductpicture",{fpid:getFinalProductId});
        result=await result
        setPictureList(result);
      }
      const handleCancel=()=>{
            setPictureId("")
      }
      const PictureComponent=(props)=>{
        return (
          <>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(event)=>handelPicture(event)}
      />
      <label htmlFor="contained-button-file">
      
        <Button variant="contained" color="primary" onClick={()=>setItem(props.value)}  component="span" value={props.value}    >
          Edit
        </Button>
      </label></>)
      }
      const handleImageSave=async()=>{
        var formdata=new FormData();
        formdata.append("pid",getPictureId)
        formdata.append("picture",getPicture.bytes);
        formdata.append("oldpicture",getOldPicture);
        var config={"content-type":"multipart/form-data"}
        var result=await insertDataImage('finalproduct/updateproductpicture',formdata,config);
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
        setPictureId("")

        fetchPicture();
      }
      const handelPicture=(event)=>{
        var x=getItem
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setPictureId(x.pictureid)
          x['status']=true
          setOldPicture(x.image)
      }
      const FillPicture=()=>{
        return(
          getPictureList.map((item)=>{
            var a=""
              if(item.status!==true || item.pictureid!==getPictureId){
                item['status']=false  
                a=`${ServerUrl}/images/${item.image}`
              }
              else{
                  a=getPicture.filename;
              }
              return(
                  <>
                  <Grid item xs={6} style={{marginTop:15}}>
                         <Avatar alt="Your Image Not Uploaded"  variant="rounded" style={{width:200,height:200}} src={`${a}`} />
                  </Grid>
                  
                  {!item.status===true?<><Grid item xs={3} style={{marginTop:10}}>
                  <PictureComponent value={item}/>
                </Grid>
                  <Grid item xs={3} style={{marginTop:10}}>
                <Button variant="outlined" color="primary" onClick={()=>handleDelete(item)} >Delete</Button>
                </Grid>   </>:<>
                <Grid item xs={3} style={{marginTop:10}}>
                <Button variant="contained" color="primary" className={classes.items} style={{paddingRight:30}} onClick={()=>handleImageSave()} >Save</Button>
                </Grid>
                <Grid item xs={3} style={{marginTop:10}}>
                <Button className={classes.items}  variant="contained" style={{marginLeft:20}} color="primary" onClick={()=>handleCancel()} >Cancel</Button>
                </Grid>
                </>}
    
    
      </>
              )
                })
        )
      }
      useEffect(function(){
          fetchPicture();
          // eslint-disable-next-line
      },[])
      const handleDelete=async(x)=>{
        var id=x.pictureid
        Swal.fire(
            {
            imageUrl:"/lenslogo.png",
            imageWidth:100,
            imageHeight:50,
            title: 'IndoForest\nAre you sure?',
            text: 'You will not be able to recover this Picture!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
            if (result.isConfirmed) {
             result=await postData("finalproduct/deleteproductpicture",{pid:id,oldpicture:x.image})
              if(result){
                swal(
                  <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
                  ,{
                  title: "Your Product Picture",
                  text: "Deleted successfully",
                  icon: "success",
                });
              }
              else{
                swal(
                  <div><img alt="..."   src="/lenslogo.png" style={{width:100,height:50}}/><h3>IndoForest</h3></div>
                  ,{
                  title: "Your Product Picture",
                  text: "Failed to delete",
                  icon: "error",
                  dangerMode: true,
                });
              }
              fetchPicture();
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your Record is safe',
                'success'
              )
            }
          })


      }
      return(
          <div className={classes.root}>
              <div className={classes.subdiv}>
                  <Grid container>
                      {FillPicture()}
                  </Grid>
              </div>
          </div>
      )
}