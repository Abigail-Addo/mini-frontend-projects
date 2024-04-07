import React from 'react'
import Button from 'react-bootstrap/Button';
import Navstyles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";


const Navbar = () => {
  return (
    <div className={Navstyles.navigation}> 
        <div className={Navstyles.logo}> Postpan </div>

        <div className={Navstyles.navLinks}>
            <ul>
                <li> Home </li>
                
                <li>
                  <Link to="/create-post">
                    <button className={Navstyles.createBtn}> <IoMdAdd /> New Post </button>
                  </Link>
                </li>
                
            </ul>
            
        </div>

    </div>
  )
}

export default Navbar;
