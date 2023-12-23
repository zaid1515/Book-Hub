import React from 'react'
import {Link} from 'react-router-dom'
import "./Navbar.css";
import logo from '../../images/img3.png'

function Navbar() {
  return (
    <nav className="navbar2" id="mainnav">
        <img src={logo} alt="logo" className="main-logo" />
        <ul className="navbar-list ">
          <Link to="/home"> <li> Home</li></Link>
          <Link to="/about"><li>About</li></Link>
        </ul>
      </nav>
  )
}

export default Navbar