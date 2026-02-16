import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { supabase } from "../supabaseClient";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto fs-5 gap-4 align-items-center">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
  <Link className="nav-link" to="/watchlist">Watchlist</Link>
</li>

<li className="nav-item">
  <Link className="nav-link" to="/favorites">Favorites</Link>
</li>

          <li className="nav-item d-flex align-items-center">
            {user ? (
              <>
                <Link to="/account" className="text-light fs-4 me-3">
                  <FaUserCircle />
                </Link>

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-light fs-4">
                <FaUserCircle />
              </Link>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;