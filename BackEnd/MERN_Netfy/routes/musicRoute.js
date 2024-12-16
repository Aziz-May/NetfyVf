import express from 'express';
import Music from '../models/musicModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


   

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the JSON file using fs
const musicData = JSON.parse(fs.readFileSync(path.join(__dirname, '../spotify_tracks.json'), 'utf-8'));

// Create a new Movie
router.post('/', async (req, res) => {
    try {
        
         
        
         
        
        
        
        const {  _id ,title, artist, album, releaseDate, genres , coverImage, previewUrl ,rating ,description } = req.body;

        if ( !_id ||!title || !artist || !album || !releaseDate || !genres  || !coverImage || !previewUrl || !rating || !description) {
            return res.status(400).json({
                message: 'Send all required fields:title, artist, album, releaseYear, genre , coverImage, previewUrl',
            });
        }

        const music = await Music.create({
            _id ,title, artist, album, releaseDate, genres , coverImage, previewUrl ,rating ,description
        });

        console.log("Music inserted successfully");

        return res.status(201).json(music);
    } catch (error) {
        console.error('Error creating music:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Load movies from JSON file into the database
router.post('/bulk-load', async (req, res) => {
    try {
        // Insert movies from the imported JSON
        await Music.insertMany(musicData);
        return res.status(200).json({ message: 'Music loaded successfully from JSON file!' });
    } catch (error) {
        console.error('Error loading music from JSON:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get all Movies
router.get('/', async (req, res) => {
    try {
        const music = await Music.find({});

        return res.status(200).json({
            count: music.length,
            data: music,
        });
    } catch (error) {
        console.error('Error fetching music:', error.message);
        res.status(500).json({ message: error.message });
    }
});
router.get('/search', async (request, response) => {
    try {
      const { title } = request.query;
  
      console.log('Search Title:', title);
  
      const musics = await Music.find({ 
        title: { $regex: title, $options: 'i' } 
      });
  
      console.log('Found Music:', musics);
  
      return response.status(200).json({
        count: musics.length,
        data: musics ,
      });
    } catch (error) {
      console.error('Search Error:', error);
      response.status(500).json({ message: error.message });
    }
  });
  
// Get a single Movie by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const music = await Music.findById(id);

        if (!music) {
            return res.status(404).json({ message: 'music not found' });
        }

        return res.status(200).json(music);
    } catch (error) {
        console.error("Error fetching Music:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update a Movie
router.put('/:id', async (req, res) => {
    try {
        const {  _id ,title, artist, album, releaseDate, genres , coverImage, previewUrl ,rating ,description } = req.body;

        if (!_id ||!title || !artist || !album || !releaseDate || !genres  || !coverImage || !previewUrl || !rating || !description) {
            return res.status(400).json({
                message: 'Send all required fields: itle, artist, album, releaseYear, genre , coverImage, previewUrl',
            });
        }

        const { id } = req.params;

        const updatedMusic = await Music.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMusic) {
            return res.status(404).json({ message: 'Music not found' });
        }

        return res.status(200).json({ message: 'Music updated successfully', data: updatedMusic });
    } catch (error) {
        console.error("Error updating music:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Delete a Movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMusic = await Music.findByIdAndDelete(id);

        if (!deletedMusic) {
            return res.status(404).json({ message: 'Music not found' });
        }

        return res.status(200).json({ message: 'Music deleted successfully' });
    } catch (error) {
        console.error("Error deleting music:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
