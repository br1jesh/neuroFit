import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaDumbbell, FaUtensils, FaHeartbeat, FaUsers, FaShieldAlt } from "react-icons/fa";
import logo from "../assets/logo.png"; // Replace with correct path

const LandingPage = () => {
  const sportsImages = [
    "https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg",
    "https://images7.alphacoders.com/130/1308025.jpg",
   ];

  const [imageSrc, setImageSrc] = useState(sportsImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSrc((prevImage) => {
        const nextIndex = (sportsImages.indexOf(prevImage) + 1) % sportsImages.length;
        return sportsImages[nextIndex];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100 z-3">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center fs-2 fw-bold" href="/">
            <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "12px" }} />
            NUROFIT
          </a>
          <div>
            <a href="/login" className="btn btn-outline-light me-3 px-4 py-2 rounded-pill">Login</a>
            <a href="/signup" className="btn btn-gold px-4 py-2 rounded-pill">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side */}
            <div className="col-md-6 text-light text-center text-md-start mb-5 mb-md-0">
              <h5 className="text-warning fw-bold">ARE YOU READY?</h5>
              <h1 className="display-4 fw-bold my-3">Transform Your Fitness Journey</h1>
              <p className="lead mb-4">
                AI-powered workouts, personalized diet plans, and injury prevention - All in One Platform.
              </p>
              <a href="/signup" className="btn btn-warning btn-lg px-1 py-3 rounded-pill d-flex align-items-center gap-2 justify-content-center justify-content-md-mid">
                Get Started <FaArrowRight />
              </a>
            </div>

            {/* Right Side - Rotating Image */}
            <div className="col-md-6 d-flex justify-content-center">
              <div
                className="hero-image-container rounded-4 shadow-lg"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  maxWidth: "500px",
                  height: "550px",
                  transition: "background-image 1s ease-in-out",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

     

      

      {/* Styles */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #000 50%,rgb(99, 82, 71) 50%);
          min-height: 100vh;
          padding-top: 150px;
          padding-bottom: 100px;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .feature-card .icon {
          font-size: 50px;
          color:rgb(42, 95, 126);
        }
        .fun-fact-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: #fff;
        }
        .btn-gold {
          background:rgb(224, 211, 31);
          border: none;
          color: black;
        }
        .btn-gold:hover, .btn-warning:hover {
          background: #b99a31;
        }
        .btn-warning {
          background:rgb(42, 209, 37);
          border: none;
          color: black;
        }
        @media (max-width: 768px) {
          .hero-image-container {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default LandingPage;
