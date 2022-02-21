const axios=require('axios');
const fetchdata= async(url)=>{
    try{
        var data=await fetch(`${url}`)
        // var data=await fetch('')
        var result=await data.json()
        return result;
    }
    catch(e){
        // alert("Error : "+e)
        console.log(e);
        return null;
    }
}
const ServerUrl='http://localhost:5000';
const insertDataImage=async(url,data,config)=>{
    try{
        var response=await axios.post(`${ServerUrl}/${url}`,data,config);
        var result=response.data;
        if(result==={}){
            if(response.status===200){
                return true
            }
            else{
                return false
            }
        }
        else{
            return result;
        }
    }
    catch(e){
        return false;
    }
}
const postData=async(url,body)=>{
    try {
    var response=await fetch(`${ServerUrl}/${url}`,{
        method:'POST',
        mode:'cors',
        headers:{"Content-Type":"application/json;charset=utf-8"}
        ,body:JSON.stringify(body)
    })
    var result = await response.json();
    return result;    
    } catch (error) {
        return false;
    }
}
export {ServerUrl,fetchdata,insertDataImage,postData};