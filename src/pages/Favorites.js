import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user not ready yet, wait
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        console.log("Favorites data:", data);
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white", textAlign: "center" }}>
        Your Favorites
      </h2>

      {favorites.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center" }}>
          No favorites yet.
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
          {favorites.map((movie) => (
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

export default Favorites;