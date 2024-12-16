import React from 'react' 
import styles from './welcome.module.css' 
import classNames from 'classnames' 
import Navbarr from '../MoviesPage/Navbarr/Navbarr'
import Footer from '../HomePage/footer/footer' 
import TitleCards from '../MoviesPage/TitleCards/TitleCards'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState ,useEffect } from 'react'
import TitleCardsMusic from '../MusicPage/TitleCardsMusic/TitleCardsMusic'
import { PORT } from '../../../../BackEnd/MERN_Netfy/config'

function Welcome(){
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:${PORT}/movies`) // Adjust port if needed
      .then((response) => {
        setMovies(response.data.data); // Assuming the response is { data: movies }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);
  const [musics, setMusics] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:${PORT}/music`) // Adjust port if needed
      .then((response) => {
        setMusics(response.data.data); // Assuming the response is { data: movies }
      })
      .catch((error) => {
        console.error('Error fetching music:', error);
      });
  }, []);




    return(
            <>

    <Navbarr/>
      <section className={styles.hero}>
        <div className={styles.hero__bg__image__container}>
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="BG hero image"
            className={styles.hero__bg__image}
          />
        </div>
        <div className={styles.hero__bg__overlay}></div>
        <div className={styles.hero__card}>
          <h1 className={styles.hero__title}>
            Welcome Back !,<br />
            Explore More your Music and Shows !
          </h1>
          <p className={styles.hero__subtitle}>Watch anywhere and cancel anytime.</p>
          <p className={styles.hero__description}>
            Ready to watch? Do you have a film in your Mind ?
            Search for it Now !
          </p>
          
        </div>
      </section>
      <TitleCards Category="" movies={movies}/>
      <div className={styles.More_Buttons}>
      <Link to= "/Movies">
      <button className={styles.Watch_Movies}> Watch More Movies</button>

    
      </Link>
        
      </div>
      <TitleCardsMusic Category="" musics={musics}/>

      <div className={styles.More_Buttons}>
      <Link to= "/Music">
      <button className={styles.Listen_Music}> Listen To More Music</button>

    
      </Link>
      </div>
      
      <Footer/>


            </>
       
    )
}
export default Welcome