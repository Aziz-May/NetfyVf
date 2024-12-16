import React, { useState, useEffect } from "react";
import Navbarr from './Navbarr/Navbarr.jsx';
import './Movies.css';
import hero_banner from '../MoviesPage/images/Capa.jpg';
import hero_title from '../MoviesPage/images/hero_title-removebg-preview.png';
import play_icon from '../MoviesPage/images/play.png';
import info_icon_icon from '../MoviesPage/images/info.png';
import TitleCards from "./TitleCards/TitleCards.jsx";
import Footer from '../HomePage/footer/footer.jsx';
import search from './images/search.png';
import axios from 'axios';
import { PORT } from "../../../../BackEnd/MERN_Netfy/config.js";
function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:${PORT}/movies`) // Adjust port if needed
      .then((response) => {
        setMovies(response.data.data); // Assuming the response is { data: movies }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  // Handle input changes for search
  const handleInputChange = (event) => setInputValue(event.target.value);
  const searchMovies = async () => {
    if (!inputValue.trim()) {
      setSearchedMovies([]);
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:${PORT}/movies/search`, {
        params: { title: inputValue }
      });
      
      console.log('Search Response:', response.data);
      console.log('Movies found:', response.data.data);
      
      setSearchedMovies(response.data.data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchedMovies([]);
    }
  };

    
  
  const handleSearch = () => {
    searchMovies();
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  };


  // Filter movies by genres
  const getMoviesByGenre = (genre) => {
    return movies?.filter((movie) => 
      movie.genre
        .split(",")  // Split the genres if they are stored as a comma-separated list
        .map(g => g.trim().toLowerCase())  // Trim and convert to lowercase
        .includes(genre.toLowerCase())  // Check if the genre matches
    ) || [];
  };

  return (
    <>
      <Navbarr handleClick2={() => setIsVisible(!isVisible)} />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner_img" />
        <div className="hero_caption">
          {isVisible && (
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <input
                className="serach_movie"
                type="text"
                placeholder="   search a movie .."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <img src={search} alt="" className="icons"  onClick={() => {setIsVisible(false) ; handleSearch()}} />
            </div>
          )}
          <img src={hero_title} alt="" className="caption_img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero_btn">
            <button className="btn">
              <img src={play_icon} alt="" className="play_img" />
              Play
            </button>
            <button className="btn dark_btn">
              <img src={info_icon_icon} alt="" className="info_img" /> More Info
            </button>
          </div>
        </div>
      </div>
      {/* Render movies by categories */}
      {searchedMovies.length > 0 ? (
         <TitleCards Category="searched Movies" movies={searchedMovies} />
       ) : (<>
        <TitleCards Category="" movies={movies}/>
      <TitleCards Category="Action" movies={getMoviesByGenre("Action")} />
      <TitleCards Category="Family" movies={getMoviesByGenre("Family")} />
      <TitleCards Category="Comedy" movies={getMoviesByGenre("Comedy")} />
      <TitleCards Category="Thriller" movies={getMoviesByGenre("Thriller")} />
      <TitleCards Category="Science Fiction" movies={getMoviesByGenre("Science Fiction")} />
      <TitleCards Category="Adventure" movies={getMoviesByGenre("Adventure")} />
      <TitleCards Category="Fantasy" movies={getMoviesByGenre("Fantasy")} />


       </>)}
      
      

      
      <Footer />
    </>
  );
}

export default Movies;
