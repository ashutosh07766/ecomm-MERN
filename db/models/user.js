const mongoose=require('mongoose')


let userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },

    password:{
        type:String,
        required:true,
    },
   phone:{
        type:Number,
        
        required:true,
    },
    type:{
        type:Number,
        default:0,
        enum:[0,1]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const userModel=mongoose.model("User",userSchema);

module.exports=userModel