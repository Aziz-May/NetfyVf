// In your server routes
import express from 'express';
import Playlist from '../models/playlistModel.js';
import mongoose from 'mongoose';
import Music from '../models/musicModel.js';

const router = express.Router();

// Fetch all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('tracks');
    res.json({ data: playlists });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching playlists' });
  }
});

// Create a new playlist




router.post('/create', async (req, res) => {
  try {
    const { name, firstTrackImage, tracks } = req.body;

    // Helper function to check if the ID is valid
    const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

    // Convert string track IDs to ObjectId, ensuring they are valid
    const trackIds = tracks
      .filter(track => isValidObjectId(track)) // Only keep valid ObjectIds
      .map(track => new mongoose.Types.ObjectId(track)); // Convert valid IDs to ObjectId

    // Check if any track IDs were invalid
    if (trackIds.length !== tracks.length) {
      console.log('Some track IDs were invalid');
    }

    // Create a new playlist with the corrected data
    const newPlaylist = new Playlist({
      name,
      firstTrackImage,
      tracks: trackIds  // Use the converted ObjectId array
    });

    // Save the new playlist
    await newPlaylist.save();

    res.json({ playlist: newPlaylist });
  } catch (error) {
    console.error("Error creating playlist:", error);  // Log error to console
    res.status(500).json({ error: 'Error creating playlist' });
  }
});


// Add a track to an existing playlist
const isValidTrackId = (id) => {
    if (typeof id !== 'string') {
      console.error('Track ID is not a string:', id);
      return false;
    }
    if (id.trim().length !== 22) {
      console.error('Track ID does not have 22 characters:', id);
      return false;
    }
    const regex = /^[a-zA-Z0-9]{22}$/;
    if (!regex.test(id)) {
      console.error('Track ID does not match the regex pattern:', id);
      return false;
    }
    return true;
  };
  
  // Add track to playlist route
  router.post('/add-track', async (req, res) => {
    try {
      const { playlistId, musicId } = req.body; // Changed from trackId to musicId
  
      console.log('Received request:', { playlistId, musicId });
  
      // Validate input fields
      if (!playlistId || !musicId) {
        return res.status(400).json({ error: 'Playlist ID and Music ID are required' });
      }
  
      // Validate IDs format
      if (!isValidTrackId(musicId)) {
        return res.status(400).json({ error: 'Invalid Music ID format' });
      }
  
      // Validate musicId (from the music collection)
      const music = await Music.findOne({ _id: musicId });
      if (!music) {
        console.error('Music track not found in database:', musicId);
        return res.status(404).json({ error: 'Music track not found' });
      }
  
      // Find the playlist
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        console.error('Playlist not found:', playlistId);
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      // Check if track is already in the playlist
      if (playlist.tracks.includes(musicId)) {
        return res.status(400).json({ error: 'Track already exists in the playlist' });
      }
  
      // Add the track to the playlist
      console.log('Adding music track to playlist...');
      playlist.tracks.push(musicId);
      await playlist.save();
  
      console.log('Music track added successfully.');
      res.status(200).json({ 
        message: 'Music track added to playlist successfully', 
        playlist: playlist 
      });
    } catch (error) {
      console.error('Server error in add-track route:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
// Delete a playlist
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlaylist = await Playlist.findByIdAndDelete(id);
    if (!deletedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.json({ success: true, message: 'Playlist deleted successfully', playlist: deletedPlaylist });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting playlist' });
  }
});
router.delete('/:playlistId/tracks/:trackId', async (req, res) => {
  try {
    const { playlistId, trackId } = req.params;

    // Find the playlist and remove the specific track
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId, 
      { $pull: { tracks: trackId } }, 
      { new: true } // Return the updated document
    );

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    console.log('Tracks after removal:', playlist.tracks);

    res.json({ 
      message: 'Track removed successfully', 
      data: playlist 
    });
  } catch (error) {
    console.error('Error removing track:', error);
    res.status(500).json({ 
      message: 'Error removing track', 
      error: error.message 
    });
  }
});
export default router;
