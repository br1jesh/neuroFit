import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ✅ Correct handleSignup function (Only once!)
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Signup successful! You can now log in.");
                navigate("/login"); // ✅ Redirect to login
            } else {
                alert(data.message || "Signup failed. Please try again.");
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
                        <h2 className="text-white text-center mb-4">Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-light">Username</label>
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
                                <label htmlFor="email" className="form-label text-light">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-light">Password</label>
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
                                Sign Up
                            </button>
                        </form>
                        <p className="text-center text-light mt-3">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary">Login</Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;
