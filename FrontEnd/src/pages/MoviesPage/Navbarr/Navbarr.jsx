import React from "react";
import './Navbarr.css' ;
import bell from '../images/bell.png';
import search from '../images/search.png'
import logo from '../images/logo.png'
import profile from '../images/Netflix-avatar.png'
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbarr({handleClick2}) {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    const [isListVisible , setIsListVisible] = useState(false) ; 
    const handleClick=()=>{
        setIsListVisible(!isListVisible) ;
        

    }
    
    
    

    return( 


        <>

            <div className="navbar">
            <div className="navbar_left">
                <img src={logo}  alt=" " className="logo" /> 
                <ul>
                <Link to="/Welcome">
                    
                    <li>Home</li>

                </Link>
                 <Link to="/Music">
                 <li>Music</li>

                 </Link>
                    <Link to="/Movies">
                    <li>Movies</li>
                    </Link>
                    
                    <li onClick={() => scrollToSection('NewPopular')}>New & Popular</li>
                    <Link to="/MoviesFAV">
                    <li>My Favourites</li>
                    </Link>
                    <Link to="/MoviesToWatch">
                    <li>My List</li>
                    </Link>
                    
                    <li onClick={() => scrollToSection('Contact')}>Contact</li>
                    
                </ul>
            </div>
            <div className="navbar_right">

                <img src={search} alt="" className="icons" onClick={handleClick2}></img>
                <p>Adults</p>
                <img src={bell}  alt="" className="icons"></img>
                <div className="navbar_profile" onMouseEnter={handleClick} onMouseLeave={handleClick} >
               
                <img src={profile} alt="" className="profile" width="50px"></img>
                {  isListVisible &&  <div className="userinfosContainer"  >
                                            <ul className="userinfos"  >
                                               
                                                <Link to="/">
                                                <li > sign out

                                                </li>

                                                </Link>
                                                
                                            </ul>

                                        </div>
                                    }
               
                
                {/*<img src="caret_icon" alt="" ></img>*/}


                </div>
                

            </div>



            </div>

          
        </>
    )
    
}
export default Navbarr 