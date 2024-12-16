import React from "react"
import './Fnavbar.css'
import logo from '../../MoviesPage/images/logo.png'
import { Link } from "react-router-dom";


function Fnavbar(){
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };




    return( 
        <>
        <div className="fnavbar">
        <ul className="fnavbar__list">
            <li className="imgg"> <img src={logo}></img></li>
            <li className="fnavbar__item" onClick={() => scrollToSection('home')}>Home</li>
            <li className="fnavbar__item" onClick={() => scrollToSection('Services')}>Services</li>
            <li className="fnavbar__item" onClick={() => scrollToSection('FAQ')}>FAQ</li>
            <li className="fnavbar__item" onClick={() => scrollToSection('Contact')}>Contact</li>
            <Link to="/LogIn">
            <li className="fnavbar__item" >Sign In</li>


            </Link>
        </ul>
    </div>


        </>
    )
}
export default Fnavbar
