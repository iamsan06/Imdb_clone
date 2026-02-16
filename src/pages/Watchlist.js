import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("watchlist")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching watchlist:", error);
      } else {
        setWatchlist(data);
      }

      setLoading(false);
    };

    fetchWatchlist();
  }, [user]);

  if (loading) return <h2 style={{ color: "white" , textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white", textAlign: "center" }}>
        Your Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center" }}>
          No movies added yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={{
                imdbID: movie.movie_id,
                Title: movie.title,
                Poster: movie.poster,
                Year: movie.year,        // ← ADDED THIS
                Type: "movie",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;