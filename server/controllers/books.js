const books = require('../models/BookSchema');

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
          res.status(500).json({ msg: "Nothing" });
     }
};

module.exports = { getAllBooks, getOneBook };
