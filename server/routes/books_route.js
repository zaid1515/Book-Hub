const express = require('express');     
const router = express.Router();
const { getAllBooks, getOneBook, createBook ,updateBook} = require('../controllers/books');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.route('/').get(getAllBooks).post(upload.single('thumbnail'), createBook);
router.route('/:slug').get(getOneBook);
router.route('/:id').put(upload.single('thumbnail') , updateBook)
module.exports = router;
