import React from "react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="services-page py-5">
      <h1 className="text-center text-white mb-5">Our Services</h1>
      <div className="container">
        <div className="row">

          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="service-card d-flex flex-column">
              <img src="src/assets/ai-training.png" className="card-img-top" alt="AI Training" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">AI-Based Training</h5>
                <p className="card-text flex-grow-1">Personalized training plans generated using AI to maximize your performance based on your fitness level and goals.</p>
                <Link to="/webcam" className="btn btn-explore mt-auto">Explore Training</Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="service-card d-flex flex-column">
              <img src="src/assets/diet-planner.png" className="card-img-top" alt="Diet Planner" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">Smart Diet Planner</h5>
                <p className="card-text flex-grow-1">AI-curated meal plans designed to meet your nutritional needs and support your workout regime effectively.</p>
                <Link to="/diet-form" className="btn btn-explore mt-auto">View Meal Plans</Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="service-card d-flex flex-column">
              <img src="src/assets/sport_route.jpg" className="card-img-top" alt="sportRoute" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">Sport Route</h5>
                <p className="card-text flex-grow-1">Sport Route is your personalized gateway to live and curated sports streams, tailored by game type, age, and duration.</p>
                <Link to="/SportRouteForm" className="btn btn-explore mt-auto">Learn More</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .services-page {
          background: linear-gradient(135deg, #000 50%, rgb(99, 82, 71) 50%);
          min-height: 100vh;
          padding-bottom: 60px;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          height: 100%; /* Equal height */
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 55px rgba(0, 0, 0, 0.15);
        }

        .btn-explore {
          background: rgb(42, 209, 37);
          color: black;
          border: none;
          font-weight: bold;
          padding: 10px 24px;
          border-radius: 50px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .btn-explore:hover {
          background: #b99a31;
          color: white;
        }

        h1 {
          font-weight: 700;
          font-size: 3rem;
        }

        .card-title {
          color: rgb(42, 95, 126);
          transition: color 0.3s ease;
        }

        .service-card:hover .card-title {
          color: rgb(152, 189, 20);
        }

        .card-img-top {
          height: 240px;
          object-fit: cover;
          width: 100%;
        }

        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .card-text {
          flex-grow: 1;
          margin-bottom: 16px;
          color: #444;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.2rem;
          }

          .card-img-top {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
