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
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione pariatur tempora debitis aliquam, beatae quam mollitia ducimus nobis commodi sunt?
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
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione pariatur tempora debitis aliquam, beatae quam mollitia ducimus nobis commodi sunt?
                         </p>
                    </div>
               </div>

          </div>
     )
}

export default Home