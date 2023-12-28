import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CreateBook.css'
import Select from '../../images/select3.png'
import { Link } from 'react-router-dom'
import URI from '../../URI'

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
     const [msg, setMsg] = useState('')

     const postBook = async (e) => {
          e.preventDefault();
          try {
               // binary files cannot be send in json therefore use formData....
               const formData = new FormData();
               formData.append("title", newBook.title);
               formData.append("slug", newBook.slug);
               formData.append("stars", newBook.stars);
               formData.append("description", newBook.description);
               newBook.category.forEach((category) => {
                    formData.append("category", category);
                  });
               formData.append("thumbnail", newBook.thumbnail);
               console.log(formData);
               
               const res = await axios.post(`${URI}/api/books`, formData);
               if (res.data.success) {
                    setMsg(`Book Created Successfully!`);
                    setPost(true);
                    setTimeout(() => {
                         setPost(false);
                         setMsg('');
                    }, 3000);
               }
               console.log(res.data.newBook);
          } catch (e) {
               console.error('Error posting book:', e);
               setMsg('Failed to create a Book! Please try again.');
               setTimeout(() => {
                    setMsg('');
               }, 3000);
          }
     };


     useEffect(() => {
          if (post) {
               setNewBook({
                    title: '',
                    slug: '',
                    description: '',
                    thumbnail: '',
                    stars: 0,
                    category: [],
                    createdAt: new Date()
               })
          }

     }, [post])

     const handleChange = (e) => {
          const { name, value } = e.target;
          setNewBook({
               ...newBook,
               // [e.target.name]: e.target.value
               [name]: value
          })
          console.log(newBook);
     }

     const handleCategoryChange = (e) => {
          setNewBook({
               ...newBook,
               category: e.target.value.split(',').map((category) => category.trim())
          })
     }

     const handleFileInput = async (e) => {
          // files are inserted as an array
          const file = e.target.files[0];
          console.log(file);
          setNewBook({
               ...newBook,
               thumbnail: file
          })
     }


     return (
          <form onSubmit={postBook} encType="multipart/form-data">
               <div className="newbook bookInput">
                    <div className="bookInputImg newbook-item">
                         {newBook.thumbnail ? (<img src={URL.createObjectURL(newBook.thumbnail)} alt="preview" />) : (<img src={Select} alt="preview" />)}
                    </div>

                    <div className="InpDetails newbook-item">
                         <div className="newBook-title">
                              <p style={{ display: 'inline' }}>Title:</p>
                              <input className='title-inp' type="text" name='title' value={newBook.title} onChange={handleChange} />
                         </div>

                         <div className="newBook-slug inp-div">
                              <p style={{ display: 'inline' }}>Slug:</p>
                              <input className='slug-inp' type="text" name='slug' value={newBook.slug} onChange={handleChange} />
                         </div>

                         <div className="newBook-desc inp-div">
                              <p >Description:</p>
                              <textarea name="description" id="desc-inp" className='desc-inp' cols="45" rows="3" value={newBook.description} onChange={handleChange}></textarea>
                         </div>


                         <div className="newBook-category inp-div">
                              <p>Category: </p>
                              <input type="text" name='category' value={newBook.category} onChange={handleCategoryChange} />
                         </div>

                         <div className="newBook-rating inp-div">
                              <p style={{ display: 'inline' }}>Stars:</p>
                              <select name="stars" id="newBook-stars" className='newBook-stars'
                                   value={newBook.stars} onChange={handleChange}>
                                   <option value="5">5</option>
                                   <option value="4">4</option>
                                   <option value="3">3</option>
                                   <option value="2">2</option>
                                   <option value="1">1</option>
                              </select>
                         </div>

                         <div className="published inp-div">
                              <p style={{ display: 'inline' }}>Created At:</p>
                              <input style={{ width: '55%' }} type="datetime-local" name="createdAt" id="book-created" value={newBook.createdAt} onChange={handleChange} />
                         </div>
                         <div className="inp-div">
                              <p style={{ display: 'inline' }}>Thumbnail:</p>
                              <input style={{ width: '70%' }} type="file" name="thumbnail" id="inp-book-img"
                                   accept='image/*' onChange={handleFileInput} />
                         </div>
                         <p>{msg}</p>
                    </div>


               </div>
               <div>
                    <div className="newbook-navigation-btn">
                         <Link to={'/books'}>
                              <button className="back-to-book">
                                   Back to Books
                              </button>
                         </Link>
                         <button className="submit" type='submit'>
                              Submit
                         </button>
                    </div>
               </div>

          </form >
     )
}

export default CreateBook