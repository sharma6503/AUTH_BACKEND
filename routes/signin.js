const express=require("express");
const {CheckUser}=require("../controllers/login")
const { InsertVerifyUser,InsertSignupUser } = require("../controllers/signin");

var router=express.Router()

router.get("/",async()=>{
   try{
      const response=await InsertSignupUser(req.params.token)
      res.status(200).send(response)

   }catch(e){
      console.log(e)
      res.status(500).send(`<html><body><h3>Registration failed</h3>
      <P>link expired...........</p>
      <p>unexpecte error happened...</p>
    
   <p>Regards</p>
   <p>Team</p></body></html>`)

   }
    
})
router.post("/verify",async(req,res)=>{
   try{
      const {name,email,password}= await req.body;
      console.log(name,password,email);
     const registerCredential= await CheckUser(email)
        if(registerCredential===false){
         await InsertVerifyUser(name,email,password)
        res.status(200).send(true)
     }else if(registerCredential===true){
      res.status(200).send(false)
  
     }else if(registerCredential==="Server busy"){
      res.status(500).send("Server busy")
  
     }
   }
   catch(e){
     console.log(e)

   }


})
module.exports=router