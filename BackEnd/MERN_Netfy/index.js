import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import moviesRoute from  "./routes/moviesRoute.js";
import usersRoute from "./routes/userRoute.js";
import musicRoute from "./routes/musicRoute.js" ;
import playlistRoute from "./routes/playlistRoute.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Movie from './models/movieModel.js'
import Music from "./models/musicModel.js";





// Setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());



// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Update the path to the correct location of movies.json
        const moviesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Mern_Netfy/movies.json'))); // Adjust the path here
        const musicData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Mern_Netfy/spotify_tracks.json'))); // Adjust the path here


        try {
            // Insert movies into MongoDB if they don't already exist
            const existingMovies = await Movie.find({});
            if (existingMovies.length === 0) {
                const result = await Movie.insertMany(moviesData);
                console.log('Movies loaded:', result);
            } else {
                console.log('Movies already loaded.');
            }
        } catch (error) {
            console.error('Error inserting movies:', error.message);
        }
        try {
            // Insert music into MongoDB if they don't already exist
            const existingMusic = await Music.find({});
            if (existingMusic.length === 0) {
                const result = await Music.insertMany(musicData);
                console.log('Music loaded:', result);
            } else {
                console.log('Music already loaded.');
            }
        } catch (error) {
            console.error('Error inserting music:', error.message);
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/movies', moviesRoute);
app.use('/api/users', usersRoute);
app.use('/music' , musicRoute) ;
app.use('/playlists' , playlistRoute) ;
