import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CreateBook.css'
import Select from '../../images/select3.png'
import { Link } from 'react-router-dom'

function CreateBook() {
     const [newBook, setNewBook] = useState({
          title: '',
          slug: '',
          description: '',
          thumbnail: '',
          stars: 0,
          category: [],
          createdAt: new Date()
     })
     const [post, setPost] = useState(false);

     const postBook = async (e) => {
          e.preventDefault();
          try {
               const res = await axios.post("http://localhost:5000/api/books", newBook)
               if (res.data.success) {
                    setPost(true)
               }
          } catch (e) {
               console.error('Error posting book:', error);
          }
     }

     const handleChange = (e) => {
          const { name, value } = e.target;
          setNewBook({
               ...newBook,
               // [e.target.name]: e.target.value
               [name]: value
          })
     }

     const handleCategoryChange = (e) => {

     }

     return (
          <div className="newbook">
               <form className="bookInput" onSubmit={postBook}>
                    <div className="bookInputImg newbook-item">
                         <img src={Select} alt="preview" />
                    </div>

                    <div className="InpDetails">
                         <div className="newBook-title inp-div">
                              <p>Title:</p>
                              <input className='title-inp' type="text" name='title' value={newBook.title} onChange={handleChange} />
                         </div>

                         <div className="newBook-slug inp-div">
                              <p style={{ display: 'inline' }}>Slug:</p>
                              <input className='slug-inp' type="text" name='slug' value={newBook.slug} onChange={handleChange} />
                         </div>

                         <div className="newBook-desc inp-div">
                              <p >Description</p>
                              <textarea name="description" id="desc-inp" className='desc-inp' cols="60" rows="6" value={newBook.description} onChange={handleChange}></textarea>
                         </div>


                         <div className="newBook-category inp-div">
                              <p>Category</p>
                              <input type="text" name='category' value={newBook.category} onChange={handleCategoryChange} />
                         </div>

                         <div className="newBook-rating inp-div">
                              <p style={{ display: 'inline' }}>Stars</p>
                              <input type="number" name="stars" id="newBook-stars" className='newBook-stars' value={newBook.stars} onChange={handleChange} />
                         </div>

                         <div className="published inp-div">
                              <p style={{ display: 'inline' }}>Created At:</p>
                              <input type="datetime-local" name="createdAt" id="book-created" value={newBook.createdAt} onChange={handleChange} />
                         </div>
                    </div>

               </form >

               <div className="navigation-btn">
                    <Link to={'/books'}>
                         <button className="back-to-book">
                              Back to Books
                         </button>
                    </Link>
                    <Link to={'/books'}>
                         <button className="submit" type='submit'>
                              Submit
                         </button>
                    </Link>
               </div>
          </div >
     )
}

export default CreateBook