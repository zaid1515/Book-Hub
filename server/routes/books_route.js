const express = require('express');     
const router=express.Router()
const {getAllBooks,getOneBook,createBook}=require('../controllers/books')


router.route('/').get(getAllBooks).post(createBook)
router.route('/:slug').get(getOneBook)

module.exports=router