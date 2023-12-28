const mongoose = require('mongoose');

const connectDB = (url) => {
     // mongoose.set('strictQuery',false)
     return mongoose.connect(url).then(()=>{
       console.log(`Connected to DB`);   
     })
}

module.exports=connectDB