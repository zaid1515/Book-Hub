const express = require('express');     
const router=express.Router()
const {getAllBooks,getOneBook}=require('../controllers/books')


router.route('/').get(getAllBooks)
router.route('/:slug').get(getOneBook)

module.exports=router