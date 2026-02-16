import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const OMDB_API_KEY = process.env.REACT_APP_OMDB_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const randomKeywords = [
    "love",
    "war",
    "dark",
    "king",
    "hero",
    "life",
    "dead",
    "night",
  ];

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  // 🎬 Fetch Random Movies
  const fetchRandomMovies = async () => {
    setLoading(true);

    const randomWord =
      randomKeywords[Math.floor(Math.random() * randomKeywords.length)];

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${randomWord}&apikey=${OMDB_API_KEY}`
      );

      const searchResults = response.data.Search || [];

      const moviesWithDetails = await Promise.all(
        searchResults.map(async (movie) => {
          const details = await axios.get(
            `https://www.omdbapi.com/?i=${movie.imdbID}&plot=short&apikey=${OMDB_API_KEY}`
          );
          return details.data;
        })
      );

      setMovies(moviesWithDetails);
    } catch (error) {
      console.log("Random Fetch Error:", error);
    }

    setLoading(false);
  };

  // 🔍 Search Movies
  const searchMovies = async () => {
    if (!search.trim()) {
      fetchRandomMovies();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${OMDB_API_KEY}`
      );

      const searchResults = response.data.Search || [];

      const moviesWithDetails = await Promise.all(
        searchResults.map(async (movie) => {
          const details = await axios.get(
            `https://www.omdbapi.com/?i=${movie.imdbID}&plot=short&apikey=${OMDB_API_KEY}`
          );
          return details.data;
        })
      );

      setMovies(moviesWithDetails);
    } catch (error) {
      console.log("Search Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container pt-0">
      <h1 className="text-center mb-4 heading">
        Film Finder
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "50px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            background: "rgba(255,255,255,0.15)",
            color: "white",
          }}
        />

        <button
          onClick={searchMovies}
          disabled={loading}
          style={{
            padding: "14px 28px",
            borderRadius: "50px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {loading ? (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
          }}
        >
          Loading...
        </div>
      ) : (
        <div className="row g-4">
          {movies.map(
            (movie, index) =>
              movie?.imdbID && (
                <div className="col-md-3" key={`${movie.imdbID}-${index}`}>
                  <MovieCard movie={movie} />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;