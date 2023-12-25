import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container" id="footer">
        <div className="items">
          BookHub
          <div className="datetime" id="foottxt">
            Your go-to platform for book management and literary exploration.
            Discover, organize, and engage with your favorite reads effortlessly.
          </div>
          <i> <FaFacebook /></i>     
          <i> <RiInstagramFill /></i>
          <i> <FaLinkedinIn /></i>       
          <i> <FaTwitter /></i>     
          <div className="footitem datetime">
           Copyright &copy; {new Date().getFullYear()} BookHub. All rights reserved.
          </div>
        </div>
        <div className="items">
          Explore BookHub
          <div className="datetime">
            <div className="footitem">My Books</div>
            <div className="footitem">Discover New Reads</div>
            <div className="footitem">Bookshelf</div>
            <div className="footitem">Genres</div>
            <div className="footitem">Recommendations</div>
          </div>
        </div>
        <div className="items">
          Quick Links
          <div className="datetime">
            <div className="footitem">Home</div>
            <div className="footitem">Browse</div>
            <div className="footitem">About Us</div>
            <div className="footitem">Contact Us</div>
          </div>
        </div>
        <div className="items">
          Contact Information
          <div className="datetime">
            <div className="footitem">Address: 456 Book Street, Cityville</div>
            <div className="footitem">Phone: +1-555-987-6543</div>
            <div className="footitem">Email: info@bookhub.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
