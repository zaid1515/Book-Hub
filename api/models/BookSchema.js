const mongoose = require('mongoose');

const BookSchema=new mongoose.Schema({
     title:{
          type:String,
          required:[true,"Book name is Must"],
          trim:true
     },
     slug:{
          type:String,
     },
     description:{
          type:String,
     },
     thumbnail:{
          type:String,
     },
     stars:{
          type:Number,
     },
     category:{
          type:Array,
     },
     createdAt:{
          type:Date,
          default:Date.now(),

     }
})

module.exports=mongoose.model('Books',BookSchema)
