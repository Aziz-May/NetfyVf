import { promises as fs } from 'fs';
import fetch from 'node-fetch';

const BASE_URL = 'https://spotify23.p.rapidapi.com/search/';
const API_KEY = 'bca306fd6dmsh461d2c1feca7895p1449fejsn5d93ff4f377e';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    },
};

// Predefined genres with more variety
const genres = [
    "Pop", "Rock", "Hip-Hop", "Jazz", "Electronic", 
    "Classical", "R&B", "Country", "Indie", "Metal", 
    "Reggae", "Blues", "Folk", "Punk", "Soul"
];

// Function to generate 1-3 random genres
const getRandomGenres = () => {
    const randomGenreCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 genres
    const selectedGenres = new Set();
    
    while (selectedGenres.size < randomGenreCount) {
        const randomIndex = Math.floor(Math.random() * genres.length);
        selectedGenres.add(genres[randomIndex]);
    }
    
    return Array.from(selectedGenres).join(', ');
};

// Function to generate a random cover image URL
const generateCoverImage = (title) => {
    // Use a placeholder image service that generates unique images based on the title
    return `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(title)}`;
};

// Function to extract track details and handle missing data
const extractTrackDetails = (track) => {
    const data = track.data || track;
    const title = data.name || 'Unknown Title';
    const artist = data.artists?.items?.[0]?.profile?.name || 'Unknown Artist';
    const album = data.albumOfTrack?.name || 'Unknown Album';
    
    return {
        _id: data.id || Math.random().toString(36).substr(2, 9),
        title: title,
        artist: artist,
        album: album,
        releaseDate: data.albumOfTrack?.release_date 
            ? new Date(data.albumOfTrack.release_date).toISOString().split('T')[0]
            : new Date(
                Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990, 
                Math.floor(Math.random() * 12), 
                Math.floor(Math.random() * 28) + 1
            ).toISOString().split('T')[0],
        genres: getRandomGenres(),
        coverImage: data.albumOfTrack?.coverArt?.sources?.[0]?.url || generateCoverImage(title),
        previewUrl: `https://open.spotify.com/track/${data.id}`,
        rating: (Math.random() * 5).toFixed(1), // Random rating between 0-5
        description: `A captivating track by ${artist} from the album ${album}. Explore the unique soundscape of this musical journey.`
    };
};

// Function to fetch track details with more robust error handling
const fetchTrackDetails = async () => {
    let allTracks = [];
    const searchTerms = [
        'pop', 'rock', 'hip hop', 'electronic', 
        'jazz', 'indie', 'country', 'blues'
    ];

    for (const term of searchTerms) {
        const offsetValues = [0, 50, 100];

        for (const offset of offsetValues) {
            const url = `${BASE_URL}?q=${encodeURIComponent(term)}&type=tracks&offset=${offset}&limit=50`;
            
            try {
                const response = await fetch(url, options);
                
                if (!response.ok) {
                    console.error(`Error fetching tracks for ${term}: ${response.status}`);
                    continue;
                }
                
                const result = await response.json();
                const tracks = result.tracks?.items || [];
                
                const processedTracks = tracks
                    .map(extractTrackDetails)
                    .filter(track => track.title !== 'Unknown Title');
                
                allTracks = allTracks.concat(processedTracks);
                
                console.log(`Fetched ${processedTracks.length} tracks for ${term}`);
            } catch (error) {
                console.error(`Fetch error for ${term}:`, error);
            }
        }
    }

    // Remove duplicates based on title
    const uniqueTracks = Array.from(new Map(allTracks.map(track => [track.title, track])).values());

    // Limit to 200 tracks to avoid excessive data
    const finalTracks = uniqueTracks.slice(0, 200);

    await fs.writeFile('spotify_tracks.json', JSON.stringify(finalTracks, null, 2));
    console.log(`Saved ${finalTracks.length} unique tracks`);

    return finalTracks;
};

// Call the function to fetch track details
fetchTrackDetails().catch(console.error);