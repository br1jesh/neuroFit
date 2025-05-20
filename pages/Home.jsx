import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDumbbell, FaUtensils, FaHeartbeat } from "react-icons/fa";

const Home = () => {
  const sportsImages = [
    "https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?cs=srgb&dl=pexels-chuck-2834917.jpg&fm=jpg",
    "https://images7.alphacoders.com/130/1308025.jpg",
    "https://w0.peakpx.com/wallpaper/180/755/HD-wallpaper-ronaldo-football-on-head-ronaldo-football-on-head-footballer-sports-athlete.jpg",
  ];

  const [imageSrc, setImageSrc] = useState(sportsImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSrc((prevImage) => {
        const nextIndex =
          (sportsImages.indexOf(prevImage) + 1) % sportsImages.length;
        return sportsImages[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex justify-content-center align-items-center text-center text-light">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6 text-md-start text-center mb-4 mb-md-0">
              <h5 className="text-warning fw-bold">UNLOCK YOUR POTENTIAL</h5>
              <h1 className="display-4 fw-bold my-3">
                Your Fitness Journey Starts Here
              </h1>
              <p className="lead mb-4">
                AI-driven workouts, custom diet plans, and injury prevention -
                all designed for your success.
              </p>
              <a
                href="/services"
                className="btn btn-warning btn-lg px-4 py-3 rounded-pill d-flex align-items-center gap-2 justify-content-center"
              >
                Explore Services
              </a>
            </div>
            <div className="col-lg-5">
              <div className="hero-image rounded-4 shadow-lg overflow-hidden">
                <img src={imageSrc} alt="hero" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Why Choose NuroFit?</h2>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="feature-card p-4">
                  <feature.icon className="icon mb-3" />
                  <h4 className="fw-bold">{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .hero-section {
  background: linear-gradient(135deg, #000 50%, rgb(99, 82, 71) 50%);
  min-height: auto; /* Ensure auto height */
  padding: 60px 0 165px; /* Reduced bottom padding */
  
}

.hero-image {
  width: 100%;
  height: 500px; 
}

.hero-image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-in-out;
}

.hero-image:hover img {
  transform: scale(1.05);
}

/* Adjust Heading and Paragraph */
.hero-section h1 {
  font-size: 2.8rem; /* Slightly smaller */
  margin-bottom: 20px; /* Less gap */
}

.hero-section p {
  margin-bottom: 20px; /* Less gap */
}

/* Button */
.btn-warning {
  background: rgb(42, 209, 37);
  border: none;
  color: black;
  font-weight: bold;
  padding: 12px 28px; /* Compact button */
}

.btn-warning:hover {
  background: #b99a31;
  color: white;
}

/* Features Section */
.features-section {
  background: rgb(133, 127, 55);
  padding: 50px 0; /* Compact padding */
}

.feature-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 30px 20px; /* Consistent card padding */
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.feature-card .icon {
  font-size: 48px;
  color: rgb(42, 95, 126);
  transition: color 0.3s ease;
}

.feature-card:hover .icon {
  color: rgb(152, 189, 20);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-image {
    height: 250px; /* More compact on mobile */
  }
  .hero-section h1 {
    font-size: 2.2rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
  .btn-warning {
    padding: 10px 22px;
  }
}

      `}</style>
    </>
  );
};

// Features Data
const features = [
  {
    title: "AI-Powered Workouts",
    description:
      "Enhance your performance with real-time feedback and analysis.",
    icon: FaDumbbell,
  },
  {
    title: "Personalized Diet Plans",
    description: "Get meal plans tailored to your goals and preferences.",
    icon: FaUtensils,
  },
  {
    title: "Injury Prevention",
    description: "Smart posture detection and correction for a safer workout.",
    icon: FaHeartbeat,
  },
];

// Fun Facts Data
const funFacts = [
  { title: "500+", subtitle: "Happy Members" },
  { title: "100+", subtitle: "Expert Trainers" },
  { title: "400+", subtitle: "Customized Workout Plans" },
  { title: "99%", subtitle: "Success Rate" },
];

export default Home;
