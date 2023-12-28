console.log('Welcome to BookHub')
// the data.json is being added to the cloud database directly from internet using insert doc.
const express = require('express');    
const app=express()
const port=process.env.PORT || 5000
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB=require('./db/connect')
const book=require('./routes/books_route')
const path = require('path');

// cors is cross-origin-resource-sharing for fetching data from react-app
app.use(cors())
// parsing incoming json and store in req.body
app.use(express.json())
// done to accept objects and arrays
app.use(express.urlencoded({extended:true}))

// all routes with /api/book are forwarded to book file which has functions for the routes which is in routes folder
app.use('/api/books',book)
// configuring Express to serve static files (like images, CSS files, etc.) located in the "uploads" directory and make them accessible under the "/uploads" route
app.use(express.static(path.join(__dirname, "./uploads", "../uploads")));

app.get('/test/:id',(req,res)=>{
     res.send('Hello by BookHub');
     console.log(req.params);
     console.log(req.query);
})

app.get('*',(req,res)=>{
     res.status(404).send('Page Not Found')
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

module.exports=app
