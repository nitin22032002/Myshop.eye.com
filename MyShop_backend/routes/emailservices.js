const email=require('nodemailer')
const EMAIL_ID="testemailidtest3@gmail.com"
const PASSWORD="nitinnitesh"
const connection=email.createTransport({
    service:'gmail',
    auth:{
        user:EMAIL_ID,
        pass:PASSWORD
    }
})
const mailOptions=(emailid,subject,body)=>{
    return({
        from:EMAIL_ID,
        to:emailid,
        subject:subject,
        html:`<h3>${body}</h3>`
    })
}
const sendMessage=(emailid,subject,body)=>{
    connection.sendMail(mailOptions(emailid,subject,body),(error,info)=>{
        if(error){
            console.log(error)
            return false
        }
        else{
            return true
        }
    })
}
module.exports=sendMessage;