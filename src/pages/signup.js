import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for verification!");
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)", // keeps it centered under navbar
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="glass-card text-light" style={{ width: "420px" }}>
        <h2 className="mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSignup}>
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
            Create Account
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-info">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;