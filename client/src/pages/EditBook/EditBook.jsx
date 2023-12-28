import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './EditBook.css'
import { Link, useParams } from 'react-router-dom'
import URI from '../../URI'

function EditBook() {
     const [book, setBook] = useState({})
     const [update, setUpdate] = useState(false);
     const [msg, setMsg] = useState('')
     const [newThumbnail,setNewThumbnail]=useState('')

     const slug=useParams().slug;
     useEffect(()=>{

          const currentBook=async()=>{
               try {
                    const res=await axios.get(`${URI}/api/books/${slug}`)
                    setBook(res.data.oneBook)
               } catch (error) {
                    console.error(error);
               }
          }

          currentBook();
     },[])


     const updateBook = async (e) => {
          e.preventDefault();
          try {
               // binary files cannot be send in json therefore use formData....
               const formData = new FormData();
               formData.append("title", book.title);
               formData.append("slug", book.slug);
               formData.append("stars", book.stars);
               formData.append("description", book.description);
               book.category.forEach((category) => {
                    formData.append("category", category);
                  });
               formData.append("thumbnail", book.thumbnail);
               console.log(formData);
               
               const res = await axios.put(`http://localhost:5000/api/books/${book._id}`, formData);
               if (res.data.success) {
                    setMsg(`Book Updated Successfully!`);
                    setUpdate(true);
                    setTimeout(() => {
                         setUpdate(false);
                         setMsg('');
                    }, 3000);
               }
               console.log(res.data.newBook);
          } catch (e) {
               console.error('Error updating book:', e);
               setMsg('Failed to updating a Book! Please try again.');
               setTimeout(() => {
                    setMsg('');
               }, 3000);
          }
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setBook({
               ...book,
               // [e.target.name]: e.target.value
               [name]: value
          })
          console.log(book);
     }

     const handleCategoryChange = (e) => {
          setBook({
               ...book,
               category: e.target.value.split(',').map((category) => category.trim())
          })
     }

     const handleFileInput = async (e) => {
          // files are inserted as an array
          const file = e.target.files[0];
          console.log(file);
          setNewThumbnail(file)
          setBook({
               ...book,
               thumbnail: file
          })
     }


     return (
          <form onSubmit={updateBook} encType="multipart/form-data">
               <div className="newbook bookInput">
                    <div className="bookInputImg newbook-item">
                          {newThumbnail?(<img src={URL.createObjectURL(book?.thumbnail)} alt="preview" />):(<img src={`http://localhost:5000/uploads/${book?.thumbnail}`} alt="preview" />)}
                    </div>

                    <div className="InpDetails newbook-item">
                         <div className="newBook-title">
                              <p style={{ display: 'inline' }}>Title:</p>
                              <input className='title-inp' type="text" name='title' value={book?.title} onChange={handleChange} />
                         </div>

                         <div className="newBook-slug inp-div">
                              <p style={{ display: 'inline' }}>Slug:</p>
                              <input className='slug-inp' type="text" name='slug' value={book?.slug} onChange={handleChange} />
                         </div>

                         <div className="newBook-desc inp-div">
                              <p >Description:</p>
                              <textarea name="description" id="desc-inp" className='desc-inp' cols="45" rows="3" value={book?.description} onChange={handleChange}></textarea>
                         </div>


                         <div className="newBook-category inp-div">
                              <p>Category: <span>()</span></p>
                              <input type="text" name='category' value={book?.category} onChange={handleCategoryChange} />
                         </div>

                         <div className="newBook-rating inp-div">
                              <p style={{ display: 'inline' }}>Stars:</p>
                              <select name="stars" id="newBook-stars" className='newBook-stars'
                                   value={book?.stars} onChange={handleChange}>
                                   <option value="5">5</option>
                                   <option value="4">4</option>
                                   <option value="3">3</option>
                                   <option value="2">2</option>
                                   <option value="1">1</option>
                              </select>
                         </div>

                         <div className="published inp-div">
                              <p style={{ display: 'inline' }}>Created At:</p>
                              <input style={{ width: '55%' }} type="datetime-local" name="createdAt" id="book-created" value={book?.createdAt} onChange={handleChange} />
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
                         <Link to={`/books/${book.slug}`}>
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

export default EditBook