import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PORT } from '../../../../BackEnd/MERN_Netfy/config.js';
import PlaylistTracks from '../PlaylistTracks/PlaylistTracks.jsx';

const PlaylistDetails = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:${PORT}/playlists`)
      .then(res => setPlaylists(res.data.data || []))
      .catch(err => console.error('Error fetching playlists:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (playlistId) => {
    setPlaylists(playlists.filter(p => p._id !== playlistId));
    axios.delete(`http://localhost:${PORT}/playlists/${playlistId}`)
      .catch(err => {
        console.error('Error deleting playlist:', err);
        axios.get(`http://localhost:${PORT}/playlists`)
          .then(res => setPlaylists(res.data.data || [])); 
      });
  };
  const removeTrack = async (playlistId, trackId) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/playlists/${playlistId}/tracks/${trackId}`
      );

      // Update the playlists state
      setPlaylists(currentPlaylists => 
        currentPlaylists.map(playlist => 
          playlist._id === playlistId 
            ? { 
                ...playlist, 
                tracks: playlist.tracks.filter(track => track._id !== trackId) 
              }
            : playlist
        )
      );

      // Update the selected playlist if it's the current one
      if (selectedPlaylist && selectedPlaylist._id === playlistId) {
        setSelectedPlaylist(prev => ({
          ...prev,
          tracks: prev.tracks.filter(track => track._id !== trackId)
        }));
      }
    } catch (error) {
      console.error('Error removing track:', error);
      // Optionally show an error message to the user
    }
  };

  const toggleExpand = (playlistId) => {
    setExpandedPlaylist(prevExpandedPlaylist => 
      prevExpandedPlaylist === playlistId ? null : playlistId
    );
  };

  const handlePlaylistClick = (playlist) => {
    // Toggle the selected playlist
    setSelectedPlaylist(prevSelectedPlaylist => 
      prevSelectedPlaylist && prevSelectedPlaylist._id === playlist._id ? null : playlist
    );
  };

  if (loading) return <div>Loading...</div>;
  if (playlists.length === 0) return <div>No playlists.</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {playlists.map(playlist => (
        <div 
          key={playlist._id}
          style={{ 
            width: '300px', 
            border: '1px solid #333', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            backgroundColor: '#1a1a1a', 
            position: 'relative', 
            transition: 'all 0.3s ease', 
            height: expandedPlaylist === playlist._id ? 'auto' : '450px', 
            maxHeight: expandedPlaylist === playlist._id ? 'none' : '450px' 
          }}
          onClick={() => handlePlaylistClick(playlist)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent playlist expansion when deleting
              handleDelete(playlist._id);
            }}
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              background: 'red', 
              color: 'white', 
              border: 'none', 
              borderRadius: '50%', 
              width: '30px', 
              height: '30px', 
              cursor: 'pointer', 
              zIndex: 10 
            }}
          >🗑️</button>

          <div onClick={() => toggleExpand(playlist._id)} 
            style={{ padding: '10px', backgroundColor: '#2a2a2a', cursor: 'pointer' }}>
            <h2 style={{ color: 'white', margin: 0 }}>{playlist.name}</h2>
          </div>

          {playlist.tracks && playlist.tracks.length > 0 && (
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img 
                src={playlist.tracks[0].coverImage || 'fallback-image-url'} 
                alt={`First track of ${playlist.name}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          )}

          <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#2a2a2a', color: '#aaa' }}>
            <span>{playlist.tracks?.length || 0} Tracks</span>
            {playlist.description && <span>{playlist.description}</span>} 
          </div>

          {expandedPlaylist === playlist._id && playlist.tracks && (
            <div style={{ padding: '10px', backgroundColor: '#333' }}>
              <h3>Tracks:</h3>
              {playlist.tracks.map(track => (
                <div key={track._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', color: 'white' }}>
                  <img 
                    src={track.imageUrl || 'fallback-track-image'} 
                    alt={track.name} 
                    style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }} 
                  />
                  <span>{track.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {selectedPlaylist && (
  <PlaylistTracks 
    playlist={selectedPlaylist} 
    onTrackRemove={(trackToRemove) => {
            removeTrack(selectedPlaylist._id, trackToRemove._id);
          }} 
  />
)}
    </div>
  );
};

export default PlaylistDetails;