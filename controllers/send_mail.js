const nodemailer = require("nodemailer");
const dotenv=require("dotenv");
const { response } = require("express");
dotenv.config()
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
   
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
});
function send_mail(toEmail,subject,content){
    const mailOption={
        from:"sharmaasharmaa50@gmail.com",
        to:toEmail,
        subject:subject,
        html:content

    }
    transporter.send_mail(mailOption,(error,info)=>{
        if(error){
            console.log("error occured",error)
        }
        else{
            console.log("Email sent:",info,response)
        }
    })
}
module.exports={send_mail}