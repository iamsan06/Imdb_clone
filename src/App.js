import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Favorites from "./pages/Favorites";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Account from "./pages/Account";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f0f0f, #1a1a1a)",
      }}
    >
      <Navbar user={user} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private */}
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/login" />}
        />

        <Route
          path="/favorites"
          element={user ? <Favorites /> : <Navigate to="/login" />}
        />

        <Route
          path="/watchlist"
          element={user ? <Watchlist /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;