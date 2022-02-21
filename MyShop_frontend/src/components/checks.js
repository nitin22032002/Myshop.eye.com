import {toast} from 'react-toastify';
const isEmpty=(txt)=>{
    if(txt.length===0){
        return true
    }
    return false
}
const isAlphabets=(txt)=>{
    if(/^[a-z A-Z]+$/.test(txt)){
        return true
    }
    return false
}
const isDigit=(txt)=>{
    if(/^[0-9]+/.test(txt)){
        return true
    }
    return false
}
const isMobile=(txt)=>{
    if(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(txt)){
        return true
    }
    return false
}
const isEmail=(txt)=>{
    if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt)){
        return true
    }
    return false
}
const ErrorMessage=(msg)=>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
export {isEmpty,isAlphabets,isDigit,isMobile,isEmail,ErrorMessage};