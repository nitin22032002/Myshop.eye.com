import React from 'react'
import MaterialTable from 'material-table';
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2'
import {Grid,Button,TextField,makeStyles} from '@material-ui/core'
import swal from '@sweetalert/with-react';
import { isEmpty,isDigit,ErrorMessage } from '../checks';
import {fetchdata,postData,ServerUrl} from '../fetchfromnode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add'
import AddPrice from './AddPrice'
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
    heading:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
    },
    items:{
        margin:5,
    }
})
)
export default function DisplayAllPriceRange(props){
    const classes=useStyles();
    const [getPriceList,setPriceList]=useState([]);
    const [getMinPrice,setMinPrice]=useState("")
    const [getMaxPrice,setMaxPrice]=useState("")
    const [geteOpen,seteOpen]=useState(false)
    const [getPriceId,setPriceId]=useState("")
    const fetchprice=async()=>{
        var result=await fetchdata(`${ServerUrl}/price/fetchprice`);
        result=await result.data
        setPriceList(result);
    }
    useEffect(function(){
        fetchprice();
    },[])
    const handelClick=async()=>{
        var err=false
        var a=0;
        if(isEmpty(getMinPrice)){
            ErrorMessage("Minimum Price Not Be Empty")
            a=1
            err=true
        }
        if(!isDigit(getMinPrice) && a!==1){
            ErrorMessage("Minimum Price Must Be Positive Integer Value")
            err=true
            a=0
        }
        if(isEmpty(getMaxPrice)){
            ErrorMessage("Maximum Price Not Be Empty")
            a=1
            err=true
        }
        if(!isDigit(getMaxPrice) && a!==1){
            ErrorMessage("Maximum Price Must Be Positive Integer Value")
            err=true
            a=0
        }
        if(parseInt(getMaxPrice)<=parseInt(getMinPrice)){
            ErrorMessage("Maximum Price Must Be Greater Then Minimum Price")
            err=true
            a=0
        }
        if(!err){
        var body={id:getPriceId,minprice:getMinPrice,maxprice:getMaxPrice}
        var result=await postData('price/updatedata',body)
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
        seteOpen(false)
        fetchprice();
      }

     }
    const handledelete=async(x)=>{
        var id=x.priceid
        Swal.fire(
            {
            imageUrl:"/lenslogo.png",
            imageWidth:100,
            imageHeight:50,
            title: 'IndoForest\nAre you sure?',
            text: 'You will not be able to recover this Price record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
            if (result.isConfirmed) {
              result=await postData("price/deleteprice",{id:id})
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
              fetchprice();
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
        setPriceId(x.priceid);
        setMinPrice(x.minprice)
        setMaxPrice(x.maxprice)
    }
    const handleeClickClose=()=>{
        seteOpen(false);
    }
    const EditDialogBox=()=>{    
        return (
          <div>
            <Dialog open={geteOpen} onClose={handleeClickClose} aria-labelledby="form-dialog-title">
              <DialogContent>
              <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                        <h3 className={classes.heading}><img alt="..."   src="/lenslogo.png" style={{width:50,height:20}} /> Edit Price Range</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" fullWidth className={classes.items} label="Minimum Price" value={getMinPrice} onChange={(event)=>setMinPrice(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" className={classes.items} fullWidth label="Maximum Price" value={getMaxPrice} onChange={(event)=>setMaxPrice(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained"  className={classes.items} style={{background:"#636e72",color:'#55E6C1'}} fullWidth onClick={()=>handelClick()}>Edit Price Range</Button>
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
    const ShowPriceTable=()=>{
        return (
            
            <MaterialTable
            title={<div style={{padding:2}}>
            <Button
    variant="contained"
    color="primary"
    size="meadium"
    startIcon={<AddIcon/>}
    onClick={()=>props.setComponent(<AddPrice/>)}
  >
    Add Price Range
  </Button>
          </div>}
              columns={[
                { title: 'Id', field: 'priceid' },
                { title: 'Minimum Price',field:'minprice'},
                { title: 'Maximum Price',field:'maxprice'}
              ]}
              data={getPriceList}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Price',
                  onClick: (event, x) =>handleeClickOpen(x)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Price',
                  onClick: (event, x) =>handledelete(x)
                }
              ]} />)
        }
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    {ShowPriceTable()}
                    {EditDialogBox()}
                </div>
            </div>
        )
}