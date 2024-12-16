import React, { useState, useEffect } from "react";
import "./Player.css";
import DetailsSection from "./DetailSection/DetailSection";
import Footer from "../HomePage/footer/footer";
import axios from "axios";
import { PORT } from "../../../../BackEnd/MERN_Netfy/config";
import { useParams } from "react-router-dom";

// SimpleVideoPlayer Component
function SimpleVideoPlayer({ movieTitle }) {
  const [videoId, setVideoId] = useState(null);
  const API_KEY = "AIzaSyBjUMf-MVITltujQWW5lj5Jqa8lta_J-1A";

  useEffect(() => {
    // Fetch video ID from YouTube API
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: `${movieTitle} trailer`,
              key: API_KEY,
              type: "video",
              maxResults: 1,
            },
          }
        );
        if (response.data.items.length > 0) {
          setVideoId(response.data.items[0].id.videoId);
        } else {
          console.error("No trailer found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieTitle]);

  if (!videoId) {
    return <div>Loading trailer...</div>; // Show loading state
  }

  return (
    <iframe
      width="90%"
      height="90%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Movie Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

const Player = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Great film, really enjoyed it!",
    "The storyline was amazing!",
  ]);

  // Fetch movie details
  useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/movies/${id}`)
      .then((response) => {
        setMovie(response.data); // Assuming the API returns the movie data
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment(""); // Clear the comment input
    }
  };

  if (!movie) {
    return <div>Loading...</div>; // Show loading state while fetching movie data
  }

  return (
    <>
      <div className="contt">
        <div className="player">
          <SimpleVideoPlayer movieTitle={movie.title} />
          <div className="player-info">
            <p className="p1">Published Date: {movie.releaseDate}</p>
            <p className="p1">Name: {movie.title}</p>
            <p className="p1">Type: {movie.genre}</p>
          </div>
        </div>

        <section className="Description">
          <h3 className="film_title">{movie.title}</h3>
          <p className="desc">{movie.overview}</p>
        </section>

        <DetailsSection className="boxes" />
        <section className="Reviews">
          <h4 className="Review_title">Reviews & Ratings</h4>
          <div className="reviews-info">
            <p className="rating">{movie.rating}</p>
            <p className="total-reviews">{movie.totalReviews} Reviews</p>
          </div>
        </section>

        <section className="Comments">
          <h4 className="title_comm">Comments</h4>
          <div className="comment-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>{comment}</p>
              </div>
            ))}
          </div>
          <div className="comment-input">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment"
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Player;
