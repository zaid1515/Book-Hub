const books = require('../models/BookSchema');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const cloudinary = require('../util/cloudinary');
const data=require('../data.json');
const { performance, PerformanceObserver } = require('perf_hooks');

function startMemoryTracking() {
    return process.memoryUsage().heapUsed;
}

function endMemoryTracking(startMemory) {
    const endMemory = process.memoryUsage().heapUsed;
    const memoryUsage = endMemory - startMemory;
    return memoryUsage;
}

const v8 = require('v8');

function startMemoryTracking() {
    return v8.getHeapStatistics();
}

function endMemoryTracking(startHeapStatistics) {
    const endHeapStatistics = v8.getHeapStatistics();
    const memoryUsage = endHeapStatistics.used_heap_size - startHeapStatistics.used_heap_size;
    return memoryUsage;
}

const getAllBooks = async (req, res) => {
     console.log(req.ip)
     const startHeapStatistics = startMemoryTracking();
     const startMemory = startMemoryTracking();
         const startTime = console.time();
     try {
          
          console.log(req.query);
          const { category, stars } = req.query;
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
     const endTime = console.timeEnd()
     const memoryUsag = endMemoryTracking(startMemory);
 
     console.log(`Memory usage for API call: ${memoryUsag/1000000} Megabytes`);
     const memoryUsage = endMemoryTracking(startHeapStatistics);
    console.log(`Memory usage for API call: ${memoryUsage/1000000} Megabytes`);
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
          res.status(500).json({ msg: e });
     }
};


const createBook = async (req, res) => {
     try {

          //    console.log(req.file);
          //    console.log(req.body);
          let cloud_res;
          if (req.file) {
               
          cloud_res = await cloudinary.uploader.upload(`/tmp/${req.file.filename}`);
          }
          console.log(cloud_res);
          const newBook = await books.create({
               title: req.body.title,
               slug: req.body.slug,
               stars: req.body.stars,
               description: req.body.description,
               category: req.body.category,
               createdAt: req.body.createdAt,
               thumbnail: cloud_res?cloud_res.url:null
          });


          console.log(newBook);
          res.status(200).json({ success: true, book: newBook });
     } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, msg: String(error) });
     }
};

const updateBook = async (req, res) => {
     try {
          const { id: bookId } = req.params;

          const updated = {
               title: req.body.title,
               slug: req.body.slug,
               description: req.body.description,
               category: req.body.category,
               createdAt: req.body.createdAt,
               stars: req.body.stars,
          }
          if (req.file) {
               const cloud_res = await cloudinary.uploader.upload(`/tmp/${req.file.filename}`);
               updated.thumbnail = cloud_res.url;
          }
          const updatedbook = await books.findByIdAndUpdate(bookId, updated, {
               new: true,
               runValidators: true,
          });

          console.log(updateBook);
          res.status(200).json({ success: true, updatedbook: updatedbook })
     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, msg: error });
     }
}

const deleteBook = async (req, res) => {
     try {

          const { id: bookId } = req.params;
          console.log(bookId);
          // const book = await books.findById(bookId);
          // const thumbnail = book._doc.thumbnail;
          // const filePath = `./tmp/${thumbnail}`
          // fs.unlinkSync(path.join(__dirname, "../", filePath));
          const deleted = await books.findByIdAndDelete(bookId)

          console.log(deleted);
          res.status(200).json({ success: true, msg: "Book Deleted successfully", deleteBook: deleted })

     } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, msg: error });
     }
}

const pop_data = async (req, res) => {
     try {
          const del=await books.deleteMany({});
          const newdata=await Promise.all(data.map(async(single_data)=>{
               const cloud_res = await cloudinary.uploader.upload(`./tmp/${single_data.thumbnail}`);
               return {...single_data,thumbnail:cloud_res.url};
          }))
          books.create(newdata)
          res.status(200).json({success:true})
     } catch (error) {
          console.log(error);
          res.status(500).json({success:false})
     }
}
module.exports = { getAllBooks, getOneBook, createBook, updateBook, deleteBook, pop_data };
