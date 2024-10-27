//import mongoose
const mongoose = require('mongoose')

//create scheme
const expenseSchema = new mongoose.Schema({
   guid:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})


//create model
const  expense = mongoose.model("expense",expenseSchema)

//export
module.exports = expense