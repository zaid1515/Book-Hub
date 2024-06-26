const express = require('express');     
const router = express.Router();
const { getAllBooks, getOneBook, createBook ,updateBook, deleteBook, pop_data} = require('../controllers/books');
const multer = require('multer');
const path =require('path');
const memoryLogger = require('../middlewares/loggerInfo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.route('/allbooks/populate').get(pop_data)
router.route('/').get(getAllBooks).post(upload.single('thumbnail'), createBook);
router.route('/:slug').get(getOneBook);
router.route('/:id').put(upload.single('thumbnail') , updateBook).delete(deleteBook)
module.exports = router;
