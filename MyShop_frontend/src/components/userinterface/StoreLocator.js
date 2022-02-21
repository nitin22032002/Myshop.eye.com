import React,{useEffect,useState} from 'react'
import {FormControl,InputLabel,Select,MenuItem,Button,makeStyles} from '@material-ui/core'
import Header from "./header"
import {ServerUrl,fetchdata} from "../fetchfromnode"
import {useHistory} from "react-router-dom"
import Footer from "./Footer"
const useStyle=makeStyles((theme)=>({
    root:{
        // flexDirection:"column",
        // [theme.breakpoints.up("sm")]:{
        //     flexDirection:"row"
        // }
    }
}))
export default function StoreLocator(props) {
    const history=useHistory() 
    const classes=useStyle()
    const [city,setCity]=useState(String(history.location.state.name).toUpperCase())
    const [storeList,setStoreList]=useState([])
    const fetchStore=async(name)=>{
        var data=await fetchdata(`${ServerUrl}/users/fetchstoresbycity?name=${name}`);
        setStoreList(data.data)
    }

    const fillCity=()=>{
        return(
            ["bengaluru","delhi","hyderabad","mumbai","pune","luchnow"].map((item)=>{
    
            item=String(item).toUpperCase()
            
            return(
              <MenuItem value={item}>{item}</MenuItem>
              
            )
          })
          )
    }
    const Store=(props)=>{
        return(
            <div style={{width:"100%",display:"flex",flexDirection:"column",height:"700px",border:"1px solid black",borderRadius:5,margin:10}}>
                <div className={classes.root} style={{height:"25%",margin:10,width:"100%",flexDirection:"flex-start",marginTop:10,display:"flex"}}>
                        <div style={{width:"58%"}}>
                            <div style={{margin:5,textTransform:"uppercase",fontSize:18,fontWeight:500}}>{props.store.storename} - {props.store.storecity}</div>
                            <div style={{margin:5,fontSize:15}}>{props.store.landmark} ,{props.store.addressone}</div>
                            <div style={{margin:5,fontSize:15}}>{props.store.storecity} ,{props.store.state}</div>
                            <div style={{margin:5,fontSize:15}}>{props.store.contactnumber}, {props.store.emailaddress}</div>
                        </div>
                        <div style={{width:"40%",display:"flex",flexDirection:"column",alignItems:"flex-end",marginRight:10}}>
                           <a href={`http://maps.google.com/maps?q=${props.store.latitude},${props.store.longitude}`} target="__blank__" style={{textDecoration:"none",width:"90%"}}> <Button style={{border:"1px solid black",backgroundColor:"#303952",color:"whitesmoke",margin:5,width:"90%"}} >Direction</Button></a>
                   <a href={`tel:${props.store.contactnumber}`} style={{textDecoration:"none",width:"90%"}}>         <Button style={{border:"1px solid black",backgroundColor:"whitesmoke",color:"#303952",margin:5,width:"90%"}} >Call Store</Button></a>
                        </div> 
                </div>
                <div style={{height:"75%",margin:10}}>
                     <img src={`${ServerUrl}/images/${props.store.picture}`} alt="....." style={{width:"100%",height:"100%"}} />
                </div>
            </div>
        )
        }
    useEffect(()=>{
        fetchStore(history.location.state.name)
        setCity(String(history.location.state.name).toUpperCase())
    },[history.location.state.name])
    
    return (
        <div>
            <Header/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"70%",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"100%",marginTop:20,marginBottom:20}}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="State_Label">Store City</InputLabel>
                        <Select
                        labelId="State_Label"
                        id="state"
                        value={city}
                        label="Store City"
                        onChange={(event)=>{fetchStore(event.target.value);setCity(event.target.value)}}
                        >
                        {fillCity()}
                        </Select>
                    </FormControl>
                </div>
                {
                    storeList.map((store)=>{
                        return(
                            <Store store={store}/>
                        )
                    })
                }
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}
