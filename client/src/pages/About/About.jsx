import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about">
            <div className="about-header">
                <h1>About Us</h1>
            </div>

            <div className="about-content">
                <p>
                    <span>Welcome to BookHub</span>, your go-to platform for organizing and rediscovering the joy of reading!
                    At BookHub, we believe in making your literary journey seamless and enjoyable. Our mission is to provide you
                    with the tools and features to effortlessly manage your book collection and create a personalized reading haven.
                </p>

                <p>
                    Whether you're an avid reader or just starting your literary adventure, BookHub is designed to cater to your needs.
                    Our intuitive book management system allows you to organize your library with ease, from updating book details to
                    enhancing your collection with vibrant cover images.
                </p>

                <p>
                    Join us on this journey to explore, organize, and rediscover the joy of reading. BookHub is not just a platform;
                    it's a community of book lovers dedicated to creating a delightful reading experience for everyone.
                </p>
            </div>
        </div>
    );
}

export default About;
