import React, { useState, useEffect } from 'react';
import { Play, Info, Heart, Plus } from "lucide-react";
import './MusicFav.css' ;
import { Link } from 'react-router-dom';

function MusicFAV() {
    const [favouritesMusic, setFavouritesMusic] = useState([]);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

    // Load favourites from localStorage when the component mounts
    useEffect(() => {
        const savedFavouritesMusic = JSON.parse(localStorage.getItem('favouritesMusic')) || [];
        setFavouritesMusic(savedFavouritesMusic);
    }, []);

    // Function to remove a music from favorites
    const removeFromFavoritesMusic = (musicToRemove) => {
        const updatedFavoritesMusic = favouritesMusic.filter(
            (music) => music.title !== musicToRemove.title
        );
        
        // Update state
        setFavouritesMusic(updatedFavoritesMusic);
        
        // Update localStorage
        localStorage.setItem('favouritesMusic', JSON.stringify(updatedFavoritesMusic));
    };

    return (
        <div className="titlecards bg-gray-900 p-4" id="Favourites">
            <h2 className="text-white text-2xl font-bold mb-4">Your Favourites</h2>
            {favouritesMusic.length === 0 ? (
                <p className="text-gray-400">No favourites yet.</p>
            ) : (
                <div className="relative w-full overflow-x-auto">
                    <div className="card_list flex justify-start items-center space-x-4 overflow-x-auto pb-4">
                        {favouritesMusic.map((music, index) => {
                            const isExpanded = expandedCardIndex === index;

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
                                                <span>{music.artist}</span>
                                                <span>• {music.relaseYear}</span>
                                                <span>• {music.genres}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                            <Link to={`/MusicPlayer/${music._id}`}>

                    
<button
  className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700 transition text-sm"
  onClick={(e) => {
    e.stopPropagation();
    
  }}
>
  
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
                                                    className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 transition text-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromFavoritesMusic(music);
                                                    }}
                                                >
                                                    <Heart className="w-4 h-4 fill-current" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MusicFAV;