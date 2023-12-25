import React from 'react'
import MainPic from '../../images/main.jpg'
import './Home.css'
import ft1 from '../../images/ft11.jpg'
import ft2 from '../../images/ft2.jpg'

function Home() {
     return (
          <div className="home">

               <div className="homeSec1">
                    <div className="maintxt home-item">
                         <h1>
                              <span className='strong-txt'>Explore</span>, <span className='strong-txt'>Organize</span>, and <span className='strong-txt'>Rediscover</span> the Joy of Reading.
                         </h1>
                    </div>
                    <div className="mainImgDiv home-item">
                         <img className='mainImg' src={MainPic} alt="" />
                    </div>
               </div>

               <div className="features-div homeSec2 home-item">
                    <h1 className="feat-head">Our Features</h1>
                    <div className="ft1 feat">
                         <p>
                         Effortlessly organize your literary world with BookHub's intuitive book management system. From creating your personalized library to updating book details, enjoy seamless control over your reading journey. Dive into the joy of efficient book organization and discovery.
                         </p>
                         <div className='feat-img-txt'>
                              <img className='ft-img' src={ft2} alt="img upload" />
                              <h2>Book Management</h2>
                         </div>
                    </div>
                    <div className="ft2 feat">
                         <div className='feat-img-txt'>
                              <img className='ft-img' src={ft1} alt="book management" />
                              <h2>Image Upload</h2>
                         </div>
                         <p>
                         Bring your bookshelf to life! Add a personal touch to your collection by uploading vibrant cover images. Showcase your favorite reads in style and make browsing visually delightful. BookHub makes it easy to enhance your literary haven with custom book cover images for a truly immersive experience.
                         </p>
                    </div>
               </div>

          </div>
     )
}

export default Home