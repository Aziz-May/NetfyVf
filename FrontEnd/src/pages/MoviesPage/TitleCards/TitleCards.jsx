import React, { useState, useEffect } from "react";
import "./TitleCards.css";
import { Play, Info, Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const TitleCards = ({ Category, movies }) => {
  // Ensure movies is always an array and log it
  const safeMovies = Array.isArray(movies) ? movies : [];
  console.log('TitleCards Movies:', safeMovies);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [likedCards, setLikedCards] = useState([]);
  const [watchLaterCards, setWatchLaterCards] = useState([]);
  const [message, setMessage] = useState("");

  // Load favorites and watch list from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
    const savedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
    // Optionally, you can update likedCards and watchLaterCards based on saved lists if needed
  }, []);

  const toggleLike = (index, e, movie) => {
    e.stopPropagation();
    
    // Update liked cards state
    setLikedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Retrieve existing favorites from localStorage
    const existingFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    // Check if the movie is already in favorites
    const isAlreadyFavorite = existingFavorites.some(fav => fav.title === movie.title);
    
    if (!isAlreadyFavorite) {
      // Add new favorite
      const updatedFavorites = [...existingFavorites, movie];
      
      // Save to localStorage
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
      
      // Show confirmation message
      setMessage(`${movie.title} added to favorites!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const toggleWatchLater = (index, e, movie) => {
    e.stopPropagation();
    
    // Update watch later cards state
    setWatchLaterCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    // Retrieve existing watch list from localStorage
    const existingWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
    
    // Check if the movie is already in watch list
    const isAlreadyInWatchList = existingWatchList.some(watchMovie => watchMovie.title === movie.title);
    
    if (!isAlreadyInWatchList) {
      // Add new movie to watch list
      const updatedWatchList = [...existingWatchList, movie];
      
      // Save to localStorage
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
      
      // Show confirmation message
      setMessage(`${movie.title} added to Watch Later!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Filter movies based on category
  const filteredMovies = Category === "searched Movies" 
  ? safeMovies 
  : safeMovies.filter((movie) =>
      Category
        ? movie.genre
            .toLowerCase()
            .split(", ")
            .some((g) => g.includes(Category.toLowerCase()))
        : true
    );

  // If no movies, return null or a message
  if (safeMovies.length === 0) {
    return (
      <div className="titlecards bg-gray-900 p-4">
        <h2 className="text-white text-2xl font-bold mb-4">
          {Category ? Category : "Popular on Netfy"}
        </h2>
        <p className="text-white">No movies found</p>
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
          {filteredMovies.map((movie, index) => {
            const isExpanded = expandedCardIndex === index;
            const isLiked = likedCards.includes(index);
            const isWatchLater = watchLaterCards.includes(index);

            return (
              <div
                key={movie._id || index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out flex-shrink-0 transform origin-center ${
                  isExpanded
                    ? "w-96 h-[500px] scale-110 z-20 mb-24"
                    : "w-56 h-80 scale-100 z-10"
                } cursor-pointer hover:z-30 self-center`}
                onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
              >
                <div className="w-full h-full relative">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className={`w-full h-full object-cover ${
                      isExpanded ? "opacity-30" : "opacity-100"
                    }`}
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    {movie.title}
                  </p>
                </div>
                {isExpanded && (
                  <div className="absolute inset-0 p-4 bg-black bg-opacity-60 text-white flex flex-col justify-end space-y-3">
                    <p className="text-sm line-clamp-3">{movie.overview}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span>{movie.duration}</span>
                      <span>• {movie.review}/10</span>
                      <span>• {movie.genre}</span>
                    </div>
                    <div className="flex space-x-2">
                    <Link to={`/Player/${movie._id}`}>
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
                          isLiked ? "bg-red-600 text-white" : "bg-gray-600 text-white"
                        }`}
                        onClick={(e) => toggleLike(index, e, movie)}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                      </button>
                      <button
                        className={`flex items-center justify-center px-3 py-2 rounded-full transition text-sm ${
                          isWatchLater ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                        }`}
                        onClick={(e) => toggleWatchLater(index, e, movie)}
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

export default TitleCards;