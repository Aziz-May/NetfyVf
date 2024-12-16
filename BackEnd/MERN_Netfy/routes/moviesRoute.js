import express from 'express';
import Movie from '../models/movieModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the JSON file using fs
const moviesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../movies.json'), 'utf-8'));

// Create a new Movie
router.post('/', async (req, res) => {
    try {
        const { title, image, genre, review, overview, releaseDate, duration, trailer } = req.body;

        if (!title || !image || !genre || !review || !overview || !releaseDate || !duration || !trailer) {
            return res.status(400).json({
                message: 'Send all required fields: title, description, genre, releaseYear, trailer',
            });
        }

        const movie = await Movie.create({
            title,
            image,
            genre,
            review,
            overview,
            releaseDate,
            duration,
            trailer,
        });

        console.log("Movies inserted successfully");

        return res.status(201).json(movie);
    } catch (error) {
        console.error('Error creating movie:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Load movies from JSON file into the database
router.post('/bulk-load', async (req, res) => {
    try {
        // Insert movies from the imported JSON
        await Movie.insertMany(moviesData);
        return res.status(200).json({ message: 'Movies loaded successfully from JSON file!' });
    } catch (error) {
        console.error('Error loading movies from JSON:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get all Movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});

        return res.status(200).json({
            count: movies.length,
            data: movies,
        });
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Search route (should come before specific ID route)
router.get('/search', async (request, response) => {
    try {
      const { title } = request.query;
  
      console.log('Search Title:', title);
  
      const movies = await Movie.find({ 
        title: { $regex: title, $options: 'i' } 
      });
  
      console.log('Found Movies:', movies);
  
      return response.status(200).json({
        count: movies.length,
        data: movies
      });
    } catch (error) {
      console.error('Search Error:', error);
      response.status(500).json({ message: error.message });
    }
  });
  
  // Get a single Movie by ID (after search route)
  router.get('/:id', async (req, res) => {
      try {
          const { id } = req.params;
  
          const movie = await Movie.findById(id);
  
          if (!movie) {
              return res.status(404).json({ message: 'Movie not found' });
          }
  
          return res.status(200).json(movie);
      } catch (error) {
          console.error("Error fetching movie:", error.message);
          res.status(500).json({ message: error.message });
      }
  });

// Update a Movie
router.put('/:id', async (req, res) => {
    try {
        const { title, description, genre, releaseYear, trailer } = req.body;

        if (!title || !description || !genre || !releaseYear || !trailer) {
            return res.status(400).json({
                message: 'Send all required fields: title, description, genre, releaseYear, trailer',
            });
        }

        const { id } = req.params;

        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie updated successfully', data: updatedMovie });
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Delete a Movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error("Error deleting movie:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
