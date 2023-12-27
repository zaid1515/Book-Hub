import React, { useState, useEffect } from 'react'
import './Books.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BooksPic from '../../images/readpic2.png'
import Loading from '../../components/Loading/Loading'

function Books() {
     const [books, setBooks] = useState([])
     const [category, setCategory] = useState('')
     const [stars, setStars] = useState(0);
     const [dropdown, setdropdown] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState("")

     const baseURL = "http://localhost:5000/api/books"
     var url = baseURL;
     if (category && stars!=0) {
          url += `?category=${category}&stars=${stars}`
     }
     else if (category) {
          url+=`?category=${category}`
     }
     else if (stars!=0) {
          url+=`?stars=${stars}`
     }

     useEffect(() => {
          const fetchBook = async () => {
               try {
                    setIsLoading(true)
                    console.log(url);
                    setTimeout(async () => {
                         const res = await axios.get(url);

                         if (res.status !== 200) {
                              throw new Error("Failed to fetch books");
                         }

                         console.log(res.data.allBooks);
                         // Update the state with the fetched data
                         setBooks(res.data.allBooks);
                         setIsLoading(false);
                    }, 1200);
               } catch (error) {
                    console.error('Error fetching books:', error);
                    setError("Error fetching data. Please try again.")
                    setIsLoading(false);
               }
          }
          fetchBook();
     }, [category, stars, url])


     // const bookCatergories=[]
     // books.forEach(book => {bookCatergories.push(...book.category)});
     useEffect(() => {
          if (dropdown.length === 0) {
               setdropdown([...new Set(books.flatMap((book) => book.category))])
          }
     }, [books])
     // This method is used in JavaScript to both map over the elements of an array and flatten the result into a new array. This is particularly handy when you want to perform a mapping operation that might return arrays for each element, and you want the final result to be a single flattened array.
     // console.log(bookCatergories);

     const clearFilters = () => {
          setCategory('');
          setStars(0);
     }

     return (
          <div className="bookpg">
               <div className="books-main-txt bookspg-item">
                    <h1>All Books</h1>
               </div>
               <div className="bookspg-item filters">
                    <div className="category filter-item">
                         Category:
                         <select name="category" value={category} id="sel-category" onChange={(e) => setCategory(e.target.value)}>
                              <option value="">All</option>
                              {dropdown.map((category, index) => (
                                   <option value={category} key={index}>
                                        {category}
                                   </option>
                              ))}

                         </select>

                    </div>
                    <div className="stars filter-item">
                         Stars:
                         <select name="stars" id="sel-stars"
                              value={stars} onChange={(e) => (setStars(e.target.value))}>
                              <option value="">All</option>
                              <option value="5">5</option>
                              <option value="4">4</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                              <option value="1">1</option>
                         </select>
                    </div>
                    <div className="clear-filters">
                         <button className="clear" onClick={clearFilters}>
                              Clear Filters
                         </button>
                    </div>
                    <img src={BooksPic} alt="" />
               </div>
               <div className="books-list">
                    {isLoading ? (
                         <Loading/>
                    ) : error ? (
                         <p>{error}</p>
                    ) : books.length>0?(<ul className="books">
                    {books.map((item) => (
                         <li key={item._id}>
                              <div>
                                   <Link to={`/books/${item.slug}`}>
                                        <img
                                             src={`http://localhost:5000/uploads/${item.thumbnail}`}
                                             alt={item.title}
                                        />
                                        <h3>{item.title}</h3>
                                   </Link>
                              </div>
                         </li>
                    ))}
               </ul>):(
                       <p className='no-books'>No Books found!</p>  
                    )}
               </div>
          </div>
     )
}

export default Books  