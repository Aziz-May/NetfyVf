import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import { PORT } from '../../../../BackEnd/MERN_Netfy/config';
import { Link } from 'react-router-dom';

const PlaylistDialog = ({
  track,
  onClose,
  onAddToPlaylist,
  onCreatePlaylist,
  onDeletePlaylist,
  onViewPlaylistTracks
}) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try { 
        const response = await axios.get(`http://localhost:${PORT}/playlists`);
        setPlaylists(response.data.data || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Failed to load playlists. Please try again.');
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const newPlaylist = {
        name: newPlaylistName,
        firstTrackImage: track.image || '',
        tracks: [track._id]
      };
      const response = await axios.post(`http://localhost:${PORT}/playlists/create`, newPlaylist);
      
      // Add the new playlist to the list and reset input
      const createdPlaylist = response.data.playlist;
      setPlaylists(prevPlaylists => [...prevPlaylists, createdPlaylist]);
      setNewPlaylistName('');
      
      // Call optional callback
      onCreatePlaylist && onCreatePlaylist(createdPlaylist);
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Could not create playlist. Please try again.');
    }
  };

  const handleAddToPlaylist = async (trackId, playlistId) => {
    try {
      console.log('Sending request to add music track:', { 
        musicId: trackId, 
        playlistId 
      });
      
      const response = await axios.post(`http://localhost:${PORT}/playlists/add-track`, {
        musicId: trackId,
        playlistId
      });
      
      // Update local state to reflect added track
      setPlaylists(prevPlaylists => 
        prevPlaylists.map(playlist => 
          playlist._id === playlistId 
            ? {...playlist, tracks: [...(playlist.tracks || []), trackId]}
            : playlist
        )
      );

      // Call optional callback
      onAddToPlaylist && onAddToPlaylist(playlistId, trackId);
    } catch (error) {
      console.error('Detailed error adding track:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Set error state for user feedback
      setError('Could not add track to playlist. Please try again.');
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:${PORT}/playlists/${playlistId}`);
      
      // Remove playlist from local state
      setPlaylists(playlists.filter(pl => pl._id !== playlistId));
      
      // Call optional callback
      onDeletePlaylist && onDeletePlaylist(playlistId);
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setError('Could not delete playlist. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-white text-xl mb-4">Add "{track.title}" to Playlist</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="float-right"
            >
              ×
            </button>
          </div>
        )}

        {/* Create New Playlist */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="flex-grow bg-gray-700 text-white p-2 rounded-l"
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-green-600 text-white px-4 py-2 rounded-r"
            disabled={!newPlaylistName.trim()}
          >
            Create
          </button>
        </div>

        {/* Playlist List */}
        <div className="space-y-2">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-gray-700 rounded p-3 flex justify-between items-center"
              >
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => handleAddToPlaylist(track._id, playlist._id)}
                >
                  <span className="text-white">{playlist.name}</span>
                  <span className="text-gray-400 ml-2 text-sm">
                    {playlist.tracks?.length || 0} tracks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                <Link to="/playlist">
                <button
                    onClick={() => onViewPlaylistTracks && onViewPlaylistTracks(playlist)}
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    <Eye size={16} className="mr-1" /> View
                  </button>
                </Link>
                  
                  <button
                    onClick={() => handleDeletePlaylist(playlist._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center">No playlists available.</div>
          )}
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlaylistDialog;