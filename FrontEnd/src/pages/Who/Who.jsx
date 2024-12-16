import React from "react"; 
import profilee from '../../pages/MoviesPage/images/Netflix-avatar.png'
import './Who.css'
import { Link } from "react-router-dom";
function Who(){

    return( 

        <> 
        <div className="Container">
             <h3> Who is watching ?</h3>
            <img src={profilee} className="whoimg"></img>
            <Link to="/Welcome">
            <button>
            <h6>me</h6>

            </button>


            </Link>
            <button className="add"> Add another user </button>
            
            
            
        </div>

        </>
    )
}
export default Who