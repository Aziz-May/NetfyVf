import React, { useState, useEffect } from "react";
import "./TitleCardsMusic.css";
import { Play, Info, Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const TitleCardsMusic = ({ Category, musics ,onAddToPlaylist }) => {
  const safeMusics = Array.isArray(musics) ? musics : [];
  console.log(musics) ;
    
  
  // Log details of the first music item to check its structure
  
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [likedCardsMusic, setLikedCardsMusic] = useState([]);
  const [listenLaterCards, setListenLaterCards] = useState([]);
  const [message, setMessage] = useState("");

  // Load favorites and watch list from localStorage when component mounts
  useEffect(() => {
    const savedFavouritesMusic = JSON.parse(localStorage.getItem('favouritesMusic')) || [];
    const savedWatchListMusic = JSON.parse(localStorage.getItem('listenList')) || [];
    // Optionally, you can update likedCards and listenLaterCards based on saved lists if needed
  }, []);

  const toggleLike = (index, e, music) => {
    e.stopPropagation();
    
    // Update liked cards state
    setLikedCardsMusic((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Retrieve existing favorites from localStorage
    const existingFavoritesMusic = JSON.parse(localStorage.getItem('favouritesMusic')) || [];
    
    // Check if the movie is already in favorites
    const isAlreadyFavoriteMusic = existingFavoritesMusic.some(fav => fav.title === music.title);
    
    if (!isAlreadyFavoriteMusic) {
      // Add new favorite
      const updatedFavoritesMusic = [...existingFavoritesMusic, music];
      
      // Save to localStorage
      localStorage.setItem('favouritesMusic', JSON.stringify(updatedFavoritesMusic));
      
      // Show confirmation message
      setMessage(`${music.title} added to favorites!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const toggleWatchLater = (index, e, music) => {
    e.stopPropagation();
    
    // Update watch later cards state
    setListenLaterCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Retrieve existing watch list from localStorage
    const existingListenList = JSON.parse(localStorage.getItem('listenList')) || [];
    
    // Check if the movie is already in watch list
    const isAlreadyInListenList = existingListenList.some(watchMusic => watchMusic.title === music.title);
    
    if (!isAlreadyInListenList) {
      // Add new movie to watch list
      const updatedListenList = [...existingListenList, music];
      
      // Save to localStorage
      localStorage.setItem('listenList', JSON.stringify(updatedListenList));
      
      // Show confirmation message
      setMessage(`${music.title} added to Watch Later!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Filter movies based on category
  const filteredMusic = (Category === "searched Musics" || Category.includes("playlist"))
  ? safeMusics 
  : safeMusics.filter((music) =>
      Category
        ? music.genres
            .toLowerCase()
            .split(", ")
            .some((g) => g.includes(Category.toLowerCase()))
        : true
    );

    if (safeMusics.length === 0) {
      return (
        <div className="titlecards bg-gray-900 p-4">
          <h2 className="text-white text-2xl font-bold mb-4">
            {Category ? Category : "Popular on Netfy"}
          </h2>
          <p className="text-white">No music found</p>
        </div>
      );
    }

  return (
    <div className="titlecards bg-gray-900 p-4" id="NewPopular">
      <h2 className="text-white text-2xl font-bold mb-4">
        {Category ? Category : "Popular on Netfy"}
      </h2>
      {message && <div className="bg-green-500 text-white p-2 mb-4">{message}</div>}
      <div className="relative w-full overflow-x-auto">
        <div className="card_list flex justify-start items-center space-x-4 overflow-x-auto pb-4">
          {filteredMusic.map((music, index) => {
            const isExpanded = expandedCardIndex === index;
            const isLikedMusic = likedCardsMusic.includes(index);
            const isListenLater = listenLaterCards.includes(index);

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out flex-shrink-0 transform origin-center ${
                  isExpanded
                    ? "w-96 h-[500px] scale-110 z-20 mb-24"
                    : "w-56 h-80 scale-100 z-10"
                } cursor-pointer hover:z-30 self-center`}
                onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
              >
                <div className="w-full h-full relative">
                  <img
                    src={music.coverImage}
                    alt={music.title}
                    className={`w-full h-full object-cover ${
                      isExpanded ? "opacity-30" : "opacity-100"
                    }`}
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    {music.title}
                  </p>
                </div>
                {isExpanded && (
                  <div className="absolute inset-0 p-4 bg-black bg-opacity-60 text-white flex flex-col justify-end space-y-3">
                    <p className="text-sm line-clamp-3">{music.album}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      {/*<span>{movie.duration}</span>*/}
                      <span>• {music.artist}/10</span>
                      <span>• {music.genres }</span>
                    </div>
                    <div className="flex space-x-2">
                    <Link to={`/MusicPlayer/${music._id}`}>

                    
                      <button
                        className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700 transition text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          
                        }}
                      >
                        <Play className="mr-2 w-4 h-4" />
                        Play
                      </button>
                      </Link>
                      <button
                        className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("More Info");
                        }}
                      >
                        <Info className="mr-2 w-4 h-4" />
                        Info
                      </button>
                      <button
                        className={`flex items-center justify-center px-3 py-2 rounded-full transition text-sm ${
                          isLikedMusic ? "bg-red-600 text-white" : "bg-gray-600 text-white"
                        }`}
                        onClick={(e) => toggleLike(index, e, music)}
                      >
                        <Heart className={`w-4 h-4 ${isLikedMusic ? "fill-current" : ""}`} />
                      </button>
                      <button
  className={`flex items-center justify-center px-3 py-2 rounded-full transition text-sm ${
    isListenLater ? "bg-green-600 text-white" : "bg-gray-600 text-white"
  }`}
  onClick={(e) => {
    e.stopPropagation();
    // Instead of directly adding to listen later
    onAddToPlaylist(music); // Use the new prop to open playlist dialog
  }}
>
  <Plus className="w-4 h-4" />
</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TitleCardsMusic;