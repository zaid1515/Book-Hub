const mongoose = require('mongoose');

const BookSchema=new mongoose.Schema({
     Title:{
          type:String,
          required:[true,"Book name is Must"],
          trim:true
     },
     author:{
          type:String,
          required:[true,"Author name is Require"]
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
     published_on:{
          type:Date.now(),

     }
})

module.exports=mongoose.model('Books',BookSchema)
