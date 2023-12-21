const books=require('../models/BookSchema')

const getAllBooks=async (req,res)=>{
     try {
          const allBooks=await books.find({}).limit(2)
          res.status(200).json({allBooks})
          console.log(`Fetched all Books ${allBooks}`);
     } catch (e) {
          res.status(500).json({msg:e})
     }
}

module.exports={getAllBooks}