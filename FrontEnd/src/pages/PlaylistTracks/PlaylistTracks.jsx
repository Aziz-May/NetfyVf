import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PORT } from '../../../../BackEnd/MERN_Netfy/config.js';
import { Link } from 'react-router-dom';

const PlaylistTracks = ({ playlist, onTrackRemove }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [localPlaylist, setLocalPlaylist] = useState(playlist);
  const { playlistId } = useParams();

  // Update local playlist when prop changes
  useEffect(() => {
    setLocalPlaylist(playlist);
  }, [playlist]);

  const handleRemoveTrack = async (track) => {
    try {
      await axios.delete(
        `http://localhost:${PORT}/playlists/${playlist._id}/tracks/${track._id}`
      );
  
      // Call the onTrackRemove prop to update parent component's state
      onTrackRemove(track);
    } catch (error) {
      console.error('Error removing track:', error);
      // Optionally show an error message
    }
  };

  if (!localPlaylist || !localPlaylist.tracks || localPlaylist.tracks.length === 0) {
    return (
      <div className="text-white bg-gray-900 p-4">
        <p className="text-gray-400">No tracks in this playlist.</p>
      </div>
    );
  }

  return (
    <div className="titlecards bg-gray-900 p-4" id="PlaylistTracks">
      <h2 className="text-white text-2xl font-bold mb-4">{localPlaylist.name} Tracks</h2>
      <div className="relative w-full overflow-x-auto">
        <div className="card_list flex justify-start items-center space-x-4 overflow-x-auto pb-4">
          {localPlaylist.tracks.map((track, index) => {
            const isExpanded = expandedCardIndex === index;

            return (
              <div
                key={track._id || index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out flex-shrink-0 transform origin-center ${
                  isExpanded ? "w-96 h-[500px] scale-110 z-20 mb-24" : "w-56 h-80 scale-100 z-10"
                } cursor-pointer hover:z-30 self-center`}
                onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
              >
                <div className="w-full h-full relative">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className={`w-full h-full object-cover ${
                      isExpanded ? "opacity-30" : "opacity-100"
                    }`}
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    {track.title}
                  </p>
                </div>
                {isExpanded && (
                  <div className="absolute inset-0 p-4 bg-black bg-opacity-60 text-white flex flex-col justify-end space-y-3">
                    <p className="text-sm line-clamp-3">{track.album}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span>{track.artist}</span>
                      <span>• {track.year}</span>
                      <span>• {track.genre}</span>
                    </div>
                    <div className="flex space-x-2">
                    <Link to={`/MusicPlayer/${track._id}`}>
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
                          // TODO: Implement more info functionality
                          alert("More Info");
                        }}
                      >
                        Info
                      </button>
                      <button
                        className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 transition text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTrack(track);
                        }}
                      >
                        Remove
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

export default PlaylistTracks;