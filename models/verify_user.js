const mongoose=require("mongoose");

const verifySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true,
    },
},
    {collection:"verify_user"}
    
);

module.exports=mongoose.model("verify_user",verifySchema)
