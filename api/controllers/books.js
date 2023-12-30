const books = require('../models/BookSchema');
const multer=require('multer')
const path = require('path');
const fs = require('fs');

const getAllBooks = async (req, res) => {
     try {
          console.log(req.query);
          const {category,stars} = req.query;
          // const stars = req.query.stars;
          const filters = {};
          if (category) {
               filters.category = category;
          }
          if (stars !== undefined) {
               filters.stars = parseInt(stars)
          }
          console.log(filters);
          
          const allBooks = await books.find(filters);
          // console.log(allBooks);
          res.status(200).json({ allBooks });
     } catch (e) {
          console.log(e);
          res.status(500).json({ msg: e });
     }
};

const getOneBook = async (req, res) => {
     try {
          const oneBook = await books.findOne({ slug: req.params.slug });
          if (!oneBook) {
               res.status(404).json({ msg: `No book with slug: ${req.params.slug}` });
          } else {
               res.status(200).json({ oneBook });
               console.log(oneBook);
               console.log(`Required book was found`);
          }
     } catch (e) {
          console.error(e);
          res.status(500).json({msg:e});
     }
};

const createBook = async (req, res) => {
     try {

     //    console.log(req.file);
     //    console.log(req.body);
        
        const newBook = await books.create({
          title: req.body.title,
          slug: req.body.slug,
          stars: req.body.stars,
          description: req.body.description,
          category: req.body.category,
          createdAt:req.body.createdAt,
          thumbnail:req.file.filename
        });

        

        console.log(newBook);
        res.status(200).json({ success: true, book: newBook });
     } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: String (error )});
     }
  };
  
const updateBook=async(req,res)=>{
     try {
          const {id:bookId}=req.params;

          const updated={
               title:req.body.title,
               slug:req.body.slug,
               description:req.body.description,
               category:req.body.category,
               createdAt:req.body.createdAt,
               stars:req.body.stars,
          }
          if (req.file) {
               updated.thumbnail=req.file.filename
          }
          const updatedbook=await books.findByIdAndUpdate(bookId,updated,{
               new:true,
               runValidators:true,
          });

          console.log(updateBook);
          res.status(200).json({success:true,updatedbook:updatedbook})
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, msg: error });
     }
}

const deleteBook=async(req,res)=>{
     try {

          const {id:bookId}=req.params;
          console.log(bookId);
          const book=await books.findById(bookId);
          const thumbnail=book._doc.thumbnail;
          const filePath=`./uploads/${thumbnail}`
          fs.unlinkSync(path.join(__dirname,"../",filePath));
          const deleted=await books.findByIdAndDelete(bookId)

          console.log(deleted);
          res.status(200).json({success:true,msg:"Book Deleted successfully",deleteBook:deleted})

     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, msg: error });
     }
}

const test=async(req,res)=>{
     try {
          console.log(__dirname);
          res.status(200).json({success:true})
     } catch (error) {
          console.log(error);
     }
}
module.exports = { getAllBooks, getOneBook ,createBook,updateBook,deleteBook,test};
