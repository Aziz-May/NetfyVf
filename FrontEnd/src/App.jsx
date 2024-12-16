
import Navbar from "./pages/HomePage/Navbar/navbar.jsx"
import Footer from "./pages/HomePage/footer/footer.jsx"
import Acceuil from "./acceuil/acceuil.jsx"
import HomeSection from "./pages/HomePage/homesection/HomeSection.jsx"
import Featuresection from "./pages/HomePage/featuresection/Featuresection.jsx"
import Faq from './pages/HomePage/Faq/Faq.jsx'
import React , {useState} from 'react'
import SignUp from './pages/SignUpPage/SignUp.jsx'
import LogIn from "./pages/LogInPage/LogIn.jsx"
import Movies from './pages/MoviesPage/Movies.jsx'
import Music from './pages/MusicPage/Music.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './pages/MoviesPage/TitleCards/TitleCards.css'
import Welcome from "./pages/Welcome/Welcome.jsx"
import Player from "./pages/Player/Player.jsx"
import Fnavbar from "./pages/HomePage/Fnavbar/Fnavbar.jsx"
import Who from "./pages/Who/Who.jsx"
import MoviesFAV from "./pages/MoviesFAV/MoviesFAV.jsx"
import MoviesToWatch from "./pages/MoviesToWatch/MoviesToWatch.jsx"
import MusicFAV from "./pages/MusicFAV/MusicFAV.jsx"
import MusicToListen from "./pages/MusicToListen/MusicToListen.jsx"
import MusicPlayer from "./pages/MusicPlayer/MusicPlayer.jsx"
import PlaylistDetails from "./pages/Playlists/PlaylistDetails.jsx"
import PlaylistTracks from "./pages/PlaylistTracks/PlaylistTracks.jsx"
import  {PORT} from "../../BackEnd/MERN_Netfy/config.js"
import axios from "axios"


function App() {
  
 

  return(
    <>
    
     
     <Routes>
      <Route 
            path="/" 
            element={(
              <>
                <Fnavbar/>
                <HomeSection/>
                <Featuresection/>
                <Faq/>
                <Footer/>
              </>
                       )} 
       />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Who" element={<Who/>}></Route>
        
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/Welcome" element={<Welcome/>}/>
        <Route path="/Movies"  element={<Movies/>}/>
        <Route path="/Music"  element={<Music/>}/>
        <Route path="/Player/:id"  element={<Player/>}/>
        <Route path="/MoviesFav" element={<MoviesFAV/>}/>
        <Route path="/MoviesToWatch" element={<MoviesToWatch/>}/>
        <Route path="/MusicFav" element={<MusicFAV/>}/>
        <Route path="/MusicToListen" element={<MusicToListen/>}/>
        <Route path="/MusicPlayer/:id" element={<MusicPlayer/>}/>
        <Route path="/playlist" element={<PlaylistDetails/>} />
        <Route path="/playlist/playlist/:id" element={<PlaylistTracks/>}/>

      
        
       



      </Routes>
     
     
     {/*<MusicPlayer/>*/}
     
      
      
      
     
     
    
     {/*<Music/>*/}
     


      
   
   
    
    
    
    
    
    
    </>
  

  ) 
} 
  
export default App
