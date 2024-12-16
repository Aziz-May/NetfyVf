import React ,{ useState, useEffect }  from 'react';
import './Music.css';
import Music_banner from '../MusicPage/images/music_banner.jpg'
import play_icon from '../MoviesPage/images/play.png';
import info_icon_icon from '../MoviesPage/images/info.png';
import TitleCardsMusic from './TitleCardsMusic/TitleCardsMusic.jsx';
import PlaylistDialog from '../Playlists/PlaylistDialog.jsx';

import search from './images/search.png';
import axios from 'axios';
import Navbarr from '../MusicPage/Navbarr/Navbarr.jsx';
import Footer from '../HomePage/footer/footer.jsx'
import { PORT } from '../../../../BackEnd/MERN_Netfy/config.js';
import { useNavigate } from 'react-router-dom';
const Music = () => {

  const [musics, setMusics] = useState([]);
  const [isVisible, setIsVisible] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchedMusics, setSearchedMusics] = useState([]);
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const navigate = useNavigate();
  const handleAddToPlaylist = (track) => {
    setSelectedTrack(track);
    setShowPlaylistDialog(true);
  };

  const handleViewPlaylistTracks = (playlist) => {
    // Navigate to playlist details page
    navigate(`/playlist/${playlist.id}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:${PORT}/music`) // Adjust port if needed
      .then((response) => {
        setMusics(response.data.data); // Assuming the response is { data: movies }
      })
      .catch((error) => {
        console.error('Error fetching musics:', error);
      });
  }, []);
  const handleInputChange = (event) => setInputValue(event.target.value);


  const searchMusics = async () => {
    if (!inputValue.trim()) {
      setSearchedMusics([]);
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:${PORT}/music/search`, {
        params: { title: inputValue }
      });
      
      {/*console.log('Search Response:', response.data);
      console.log('Music found:', response.data.data);*/}
      
      setSearchedMusics(response.data.data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchedMusics([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMusics();
    }
  };
  const handleSearch = () => {
    searchMusics();
  };


  // Filter movies by genres
  const getMusicsByGenre = (genre) => {
    return musics?.filter((music) => 
      music.genres
        .split(",")  
        .map(g => g.trim().toLowerCase())  
        .includes(genre.toLowerCase())  
    ) || [];
  };
  
  return (
    <>
    <Navbarr handleClick2={() => setIsVisible(!isVisible)} />
    
      

      
      <div className='hero'>
      
        <img src={Music_banner} alt="" className='banner_img'></img>
        
        <div className="hero_caption_music">
        {isVisible && (
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <input
                className="serach_music"
                type="text"
                placeholder="   search a music .."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <img src={search} alt="" className="serachMusicImg" onClick={() => {setIsVisible(false) ; handleSearch()}} />
            </div>
          )}
       
                                
                                <h2 className="musicIntro"> Your Music , Your Podcasts , Your Home</h2>
         </div>
      </div>

      {searchedMusics.length > 0 ? (
         <TitleCardsMusic Category="searched Musics" musics={searchedMusics} onAddToPlaylist={handleAddToPlaylist} />
       ) : <>
       <TitleCardsMusic Category="" musics={musics} onAddToPlaylist={handleAddToPlaylist}/>
      <TitleCardsMusic Category="jazz" musics={getMusicsByGenre("jazz")} onAddToPlaylist={handleAddToPlaylist}/>
      <TitleCardsMusic Category="pop" musics={getMusicsByGenre("pop")} onAddToPlaylist={handleAddToPlaylist}/>
      <TitleCardsMusic Category="rock" musics={getMusicsByGenre("rock")} onAddToPlaylist={handleAddToPlaylist} />
      <TitleCardsMusic Category="hip-hop" musics={getMusicsByGenre("hip-hop")} onAddToPlaylist={handleAddToPlaylist}/>
      <TitleCardsMusic Category="Electronic" musics={getMusicsByGenre("Electronic")} onAddToPlaylist={handleAddToPlaylist}/>
     

      

       </>
      


      }
      {showPlaylistDialog && selectedTrack && (
        <PlaylistDialog 
          track={selectedTrack}
          onClose={() => setShowPlaylistDialog(false)}
          onViewPlaylistTracks={handleViewPlaylistTracks}
        />
      )}


      <Footer/>
   


    </>
    
  );
};

export default Music;




