const books = require('../models/BookSchema');
const multer=require('multer')

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
          console.log(allBooks);
          res.status(200).json({ allBooks });
     } catch (e) {
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
               console.log(`Required book was found`);
          }
     } catch (e) {
          res.status(500).json({msg:e});
     }
};

const createBook = async (req, res) => {
     try {
        // Access the uploaded file from req.file
        const { title, slug, description, stars, category, createdAt } = req.body;
        const thumbnail = req.file;

        console.log(req.file);
        console.log(req.thumbnail);
        // Create a new book with both form fields and the uploaded thumbnail
        const newBook = await books.create({
           title,
           slug,
           description,
           stars,
           category,
           createdAt,
           thumbnail: thumbnail.filename, 
        });
  
        console.log(newBook);
        res.status(200).json({ success: true, book: newBook });
     } catch (error) {
     //    console.error(error);
        res.status(500).json({ success: false, msg: error.message });
     }
  };
  
module.exports = { getAllBooks, getOneBook ,createBook};
