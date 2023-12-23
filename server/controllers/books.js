const books=require('../models/BookSchema')

const getAllBooks=async (req,res)=>{
     try {
          // to display only 2 objects
          // const allBooks=await books.find({}).limit(2)
          const allBooks=await books.find({})
          res.status(200).json({allBooks})
          console.log(`Fetched all Books ${allBooks}`);
     } catch (e) {
          res.status(500).json({msg:e})
     }
}

const getOneBook=async(req,res)=>{
     try {
          const oneBook=await books.findOne({slug:req.params.slug})
          if (!oneBook) {
               res.status(404).json({msg:`No book with slug : ${req.params.slug} `})
          }
          else{
               res.status(200).json({oneBook});
               console.log(`Required book was found`);
          }
     } catch (e) {
          res.status(500).json({msg:"Nothing"})
     }
}

module.exports={getAllBooks,getOneBook}