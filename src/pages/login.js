import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
  if (user) {
    navigate("/");
  }
}, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="glass-card text-light" style={{ width: "420px" }}>
        <h2 className="mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3 bg-transparent text-light border-light"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3 bg-transparent text-light border-light"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-info">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;