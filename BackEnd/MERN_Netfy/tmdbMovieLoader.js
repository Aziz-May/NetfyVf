import { writeFile } from 'fs/promises';
import { join } from 'path';

const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const fetchMoviesWithDuration = async () => {
  const apiKey = "1c95d4ba57e8bf4eaf5ebf00624c39be";
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  let allMovies = [];

  try {
    for (let page = 1; page <= 20; page++) {
      const response = await fetch(`${baseUrl}?api_key=${apiKey}&page=${page}`);
      const data = await response.json();
      allMovies = allMovies.concat(data.results);
    }

    const moviesWithRuntime = await Promise.all(
      allMovies.map(async (movie) => {
        const movieDetailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        );
        const movieDetails = await movieDetailsResponse.json();

        return {
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          genre: movie.genre_ids.map(id => genreMap[id] || 'Unknown').join(", "), 
          review: movie.vote_average,
          overview : movieDetails.overview ,
          releaseDate: movie.release_date,
          duration: `${movieDetails.runtime} mins`,
          trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+trailer`,
        };
      })
    );

    const filePath = join(process.cwd(), 'movies.json');
    
    await writeFile(filePath, JSON.stringify(moviesWithRuntime, null, 2));
    console.log('Movies saved to:', filePath);

    return moviesWithRuntime;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

fetchMoviesWithDuration();