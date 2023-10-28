const user=require("../models/user")
const{ sendMail}=require("./send_mail")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
var jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

const verify_user = require("../models/verify_user")
dotenv.config()




async function InsertVerifyUser(name,email,password){
try{
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const token=generateToken(email)

    const newUser=new verify_user({
        name:name,
        email:email,
        password:hashedPassword,
        token:token

    })



    const activationLink=`https://auth-backend-2pls.onrender.com/signin/${token}`
    const content=`<h3>hi,there</h3><h4>Welcome to the app</h4>
    <P>Thanku for signing up.click the below link to activate</p>
    <a href="${activationLink}>click here</a>
<p>Regards</p>
<p>Team</p>`

await newUser.save()
sendMail(email,"verify_user",content)
}catch(e){
    console.log(error)

}}


function generateToken(email){
    const token=jwt.sign(email,process.env.signup_secret)
    return token

}
async function InsertSignupUser(token){
   try{ const userVerify=await verify_user.findOne({token:token})
   if(userVerify){
       const newUser=new user({
           name:userVerify.name,
           email:userVerify.email,
           password:userVerify.password,
           forgetPassword:{}
       })
       await newUser.save()
       await userVerify.deleteOne({token:token})
       const content=`<h3>Registration Successful</h3><h4>Welcome to the app</h4>
       <P>u r successfully registered/p>
       
   <p>Regards</p>
   <p>Team</p>`
   sendMail(newUser.email,"Registeration Successful",content)
   return `<h3>Registration Successful</h3><h4>Welcome to the app</h4>
   <P>u r successfully registered/p>
  
<p>Regards</p>
<p>Team</p>`
   }
   return `<h3>Registration failed</h3>
   <P>link expired...........</p>
 
<p>Regards</p>
<p>Team</p>`

   }catch(error){
    console.log(error)
    return `<html><body><h3>Registration failed</h3>
    <P>link expired...........</p>
    <p>unexpecte error happened...</p>
  
 <p>Regards</p>
 <p>Team</p></body></html>`
 

   }
}


module.exports={InsertVerifyUser,InsertSignupUser}
