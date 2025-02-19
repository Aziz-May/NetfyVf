import React, { useState, useEffect } from 'react';
import { Play, Info, Heart, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

function MoviesToWatch() {
    const [watchList, setWatchList] = useState([]);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

    // Load watch list from localStorage when the component mounts
    useEffect(() => {
        const savedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
        setWatchList(savedWatchList);
    }, []);

    // Function to remove a movie from watch list
    const removeFromWatchList = (movieToRemove) => {
        const updatedWatchList = watchList.filter(
            (movie) => movie.title !== movieToRemove.title
        );
        
        // Update state
        setWatchList(updatedWatchList);
        
        // Update localStorage
        localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    };

    return (
        <div className="titlecards bg-gray-900 p-4" id="ToWatch">
            <h2 className="text-white text-2xl font-bold mb-4">Watch Later</h2>
            {watchList.length === 0 ? (
                <p className="text-gray-400">No movies in watch list yet.</p>
            ) : (
                <div className="relative w-full overflow-x-auto">
                    <div className="card_list flex justify-start items-center space-x-4 overflow-x-auto pb-4">
                        {watchList.map((movie, index) => {
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
                                                    className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 transition text-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromWatchList(movie);
                                                    }}
                                                >
                                                    <Trash className="w-4 h-4" />
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

export default MoviesToWatch;