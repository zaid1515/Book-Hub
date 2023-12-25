import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function SingleBook() {
  const [oneBook, setOneBook] = useState([])
  const params = useParams();
  const slug = params.slug;
  console.log(params);
  console.log(slug);

  const url = `http://localhost:5000/api/books/${slug}`

  useEffect(() => {

    const fetchBook = async () => {
      try {
        const res = await axios.get(url)

        console.log(res.data);
        console.log(res.data.oneBook);
        setOneBook(res.data.oneBook)
      } catch (e) {

      }
    }
    fetchBook()
  }, [])

  return (
    <div className="onebook">
      <div className="bookContent">
        <div className="bookImg">
          <img src={`http://localhost:5000/uploads/${oneBook.thumbnail}`} alt="" />
        </div>

        <div className="bookDetails">
          <h1 className="oneBook-title">{oneBook.title}</h1>
          <p className="oneBook-desc">{oneBook.description}</p>
          <div className="oneBook-rating">
            {oneBook.stars}
          </div>
          <div className="oneBook-cateogory">
            {oneBook?.category?.map((item,index)=>
            (
              <h1>{item}</h1>
            ))}
          </div>
        </div>

      </div>

      <div className="navigation-btn">
        <Link to={'/books'}>
          <button className="back-to-book">
            Back to Books
          </button>
        </Link>
        <Link to={'/edit'}>
          <button className="edit">
            Edit Book
          </button>
        </Link>

      </div>
    </div>
  );
}

export default SingleBook