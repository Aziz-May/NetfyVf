
import { Link } from 'react-router-dom';
import './HomeSection.css'

function HomeSection(){
    return(
        <>
        <section id="home">
        <h2>Subscribe NOW !</h2>
        <h4>Choose a Categorie and Join Us !</h4>

        <div className="box-container">
            <div className="box" id="i1">
                <h3>Inscription Musique</h3>
                <p>Ecoutez votre Musique preferés <br/> <br/><b><span>3.99$/mois</span></b></p>
                <Link to="/signup">
                <button className="subscribe">S'inscrire</button>
                   </Link>
                
            </div>
            <div className="box" id="i2">
                <h3>Inscription Films</h3>
                <p>Regardez vos films preferés<br/> <br/><b><span>4.99$/mois</span></b></p> 
                <Link to="/signup">
                <button className="subscribe">S'inscrire</button>
                   </Link>
            </div>
            <div className="box" id="i3">
                <h3>Inscription musique/films 3</h3>
                <p>Ecoutez vos Musique et regardez vos Films preferés<br/> <br/><b><span>8.99$/mois</span></b> </p>
                <Link to="/signup">
                <button className="subscribe">S'inscrire</button>
                   </Link>
            </div>
        </div>
    </section>
        </>
    )
}
export default HomeSection ;