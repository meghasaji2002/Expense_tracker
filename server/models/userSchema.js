//import mongoose
const mongoose = require('mongoose')

//create scheme
const userSchema = new mongoose.Schema({
   guid:{
        type:String,
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    
    profile:{
        type:String,
        require:false
    },
    userType:{
        type:String,
        require:true
    }
})


//create model
const  user = mongoose.model("user",userSchema)

//export
module.exports = user 