import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './SingleBook.css'
import URI from '../../URI'

function SingleBook() {
  const [oneBook, setOneBook] = useState([]);
  const [bookDelete , setBookDelete] =useState(false);
  const params = useParams();
  const slug = params.slug;
  const navigate=useNavigate();
  // console.log(params);
  // console.log(slug);

  
  useEffect(() => {
    
    const fetchBook = async () => {
      try {
        const url = `${URI}/api/books/${slug}`
        const res = await axios.get(url)
        
        console.log(res.data.oneBook);
        setOneBook(res.data.oneBook)
      } catch (e) {
        console.error(e);
      }
    }
    fetchBook()
  }, [])
  
  
  const deleteBook = async () => {
    try {
      const delurl = `${URI}/api/books/${oneBook._id}`
      const res = await axios.delete(delurl)
      
      setBookDelete(true);
      setTimeout(() => {
        // Use history object to navigate back to /books
        navigate('/books');
      }, 5000);
      
    } catch (e) {
      console.error(e);
    }
  }

  const publishedOn = new Date(oneBook.createdAt)
  const day = publishedOn.toLocaleDateString(undefined, { day: 'numeric' })
  const month = publishedOn.toLocaleDateString(undefined, { month: 'short' })
  const year = publishedOn.toLocaleDateString(undefined, { year: 'numeric' })


  function Stars(props) {
    const stars = [];
    for (let i = 0; i < props.num; i++) {
      stars.push(<span key={i}>⭐</span>)
    }
    return stars
  }
  return (
    <div className="onebook">
      <div className="bookContent">
        <div className="bookImg onebook-item">
          <img src={`${URI}/${oneBook?.thumbnail}`} alt="" />
        </div>
        {bookDelete?(<p className='deleted'>Book Deleted Successfully</p>):
        (
          <div className="bookDetails onebook-item">
          <h1 className="oneBook-title">
            {oneBook?.title?.toUpperCase()}</h1>
          {/* ?. is called Optional chaining */}
          <p className="oneBook-desc">{oneBook?.description}</p>
          <div className="oneBook-rating">
            <p>Star Rating: <Stars num={oneBook?.stars} /> </p>

          </div>
          <div className="oneBook-category">
            <p>Category</p>
            <ul className="cat-list">
              {oneBook?.category?.map((item, index) =>
              (
                <li key={index}>{`${item?.charAt(0).toUpperCase() + item?.slice(1)}`}</li>
              ))}
            </ul>
          </div>
          <div className="published">
            <p>
              <span className='date-book'>Published On:</span>
              <span>{`${day} `}</span>
              <span>{` ${month} `}</span>
              <span>{` ${year} `}</span>
            </p>

          </div>
        </div>

        )}

              </div>

      <div className="navigation-btn">
        <Link to={'/books'}>
          <button className="back-to-book">
            Back to Books
          </button>
        </Link>
        <Link to={`/edit/${oneBook?.slug}`}>
          <button className="edit">
            Edit Book
          </button>
        </Link>

        <button onClick={deleteBook} className="edit">
          Delete Book
        </button>


      </div>
    </div>
  );
}

export default SingleBook