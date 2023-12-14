console.log('Welcome to BookHub')

const express = require('express');    
const app=express()
const port=process.env.PORT || 5000
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB=require('./db/connect')
// cors is cross-origin-resource-sharing for fetching data from react-app

// parsing incoming json and store in req.body
app.use(express.json())
// done to accept objects and arrays
// app.use(express.urlencoded({extended:true}))

// all routes with /api/book are forwarded to book file which has functions for the routes which is in routes folder
// app.use('/api/books',book)
app.get('/',(req,res)=>{
     res.send('Hello by BookHub');
})

const start=async ()=>{
     try {
          await connectDB(process.env.MONGO_URI)
          app.listen(port,()=>{console.log(`Server listening to ${port}`);})
     } catch (e) {
          console.error(e)
     }
}

start()
