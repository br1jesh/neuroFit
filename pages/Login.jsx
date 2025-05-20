import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle login function (Only once)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful!"); // ✅ Show success message
        navigate("/home"); // ✅ Redirect to home
      } else {
        alert(data.message || "Invalid login credentials."); // ✅ Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <section className="w-100">
        <div className="container d-flex justify-content-center">
          <div className="col-lg-4 col-md-6 bg-secondary bg-opacity-75 rounded-lg p-4 shadow-lg mt-5">
            <h2 className="text-white text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-light">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
                Login
              </button>
            </form>
            <p className="text-center text-light mt-3">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
