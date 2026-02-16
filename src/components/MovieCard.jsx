import React, { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // make sure path is correct
import { AuthContext } from "../context/AuthContext";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Check initial favorite & watchlist status
  useEffect(() => {
    const checkMovieStatus = async () => {
      if (!user) return;

      // Check Favorites
      const { data: favData } = await supabase
        .from("favorites")
        .select("*")
        .match({ user_id: user.id, movie_id: movie.imdbID });

      if (favData && favData.length > 0) {
        setIsFavorite(true);
      }

      // Check Watchlist
      const { data: watchData } = await supabase
        .from("watchlist")
        .select("*")
        .match({ user_id: user.id, movie_id: movie.imdbID });

      if (watchData && watchData.length > 0) {
        setIsWatchLater(true);
      }
    };

    checkMovieStatus();
  }, [user, movie.imdbID]);

  // 🔹 Toggle Favorite
  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .match({ user_id: user.id, movie_id: movie.imdbID });

      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert([
        {
          user_id: user.id,
          movie_id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        },
      ]);

      setIsFavorite(true);
    }

    setLoading(false);
  };

  // 🔹 Toggle Watchlist
  const toggleWatchLater = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);

    if (isWatchLater) {
      await supabase
        .from("watchlist")
        .delete()
        .match({ user_id: user.id, movie_id: movie.imdbID });

      setIsWatchLater(false);
    } else {
      await supabase.from("watchlist").insert([
        {
          user_id: user.id,
          movie_id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        },
      ]);

      setIsWatchLater(true);
    }

    setLoading(false);
  };

  return (
    <div className="movie-card">
      <div className="image-container">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="movie-image"
        />

        <div className="overlay">
          <h5>{movie.Title}</h5>
          <p className="genre">{movie.Genre}</p>

          <p className="plot">
            {movie.Plot && movie.Plot !== "N/A"
              ? movie.Plot
              : "No description available."}
          </p>

          <div className="overlay-actions">
            <button
              className="icon-btn"
              onClick={toggleFavorite}
              disabled={loading}
            >
              {isFavorite ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <button
              className="icon-btn"
              onClick={toggleWatchLater}
              disabled={loading}
            >
              {isWatchLater ? (
                <FaBookmark color="gold" />
              ) : (
                <FaRegBookmark />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h5>{movie.Title}</h5>
        <p>
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;