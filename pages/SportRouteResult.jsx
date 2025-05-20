import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Suggestion logic
const getSuggestions = (data) => {
  const { sport, age, skillLevel, financialStatus } = data;
  let club = "Generic Sports Academy";
  let coach = "Coach Alex (Intermediate)";
  let plan = "3 days/week general training";
  let coachPhone = "+91-9876543210";
  let clubAddress = "Central Sports Complex, City Center";
  let nearbyClubs = ["Elite Sports Arena", "UrbanFit Zone", "Victory Sports Ground"];

  if (sport === "Tennis") {
    if (age < 18) {
      club = financialStatus === "Low" ? "City Community Tennis Center" : "Ace Junior Tennis Academy";
      coach = "Coach Serena (Youth Specialist)";
      coachPhone = "+91-9123456780";
      clubAddress = "Sector 15, Tennis Lane, Downtown";
      plan = "4 days/week drills + 2 days endurance";
    } else {
      club = financialStatus === "High" ? "Grand Slam Tennis Club" : "RallyPoint Tennis Hub";
      coach = skillLevel === "Advanced" ? "Coach Roger (Pro Level)" : "Coach Simona (Intermediate)";
      coachPhone = skillLevel === "Advanced" ? "+91-9000011111" : "+91-9000022222";
      clubAddress = "Champions Arena, Hill View Road";
      plan = "3 days/week endurance + 2 days skill";
    }
  } else if (sport === "Football") {
    if (age < 18) {
      club = financialStatus === "Low" ? "Young Kickers Football Center" : "NextGen Football Academy";
      coach = "Coach Messi (Youth Attack)";
      coachPhone = "+91-9988776655";
      clubAddress = "Greenfield Park, Youth Avenue";
      plan = "5 days/week fitness + 2 days match practice";
    } else {
      club = financialStatus === "High" ? "ProKick FC" : "City Kickstart Club";
      coach = skillLevel === "Beginner" ? "Coach David (Foundations)" : "Coach Cristiano (Elite Striker)";
      coachPhone = skillLevel === "Beginner" ? "+91-9333344444" : "+91-9444455555";
      clubAddress = "Stadium Road, Sector 9";
      plan = "3 days tactics + 2 days stamina + 2 days friendly games";
    }
  } else if (sport === "Badminton") {
    club = financialStatus === "Low" ? "SmashRoots Community Center" : "SmashPro Arena";
    coach = age < 16 ? "Coach Neha (Youth)" : "Coach Gopi (National)";
    coachPhone = age < 16 ? "+91-8111122222" : "+91-8222233333";
    clubAddress = "Indoor Court Complex, Zone 3";
    plan = "3 days agility + 3 days technique";
  }

  return { club, coach, plan, coachPhone, clubAddress, nearbyClubs };
};

const SportRouteResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sportData } = location.state || {};

  const [loading, setLoading] = useState(!sportData);

  useEffect(() => {
    if (sportData) {
      setLoading(false);
      console.log("Received Sport Data:", sportData);
    }
  }, [sportData]);

  if (!sportData) {
    return (
      <div className="text-center mt-5">
        <h2>No sport data available!</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h2>Loading Sport Route...</h2>
      </div>
    );
  }

  const { club, coach, plan, coachPhone, clubAddress, nearbyClubs } = getSuggestions(sportData);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(135deg, #3a3a52, #161d2e)", color: "#fff" }}
    >
      <div className="p-5 shadow-lg" style={{ width: "700px", background: "#1e1e2f", borderRadius: "16px" }}>
        <h2 className="text-center mb-4">🏅 Personalized Sport Route for {sportData.name}</h2>

        {/* Suggested Plan */}
        <div className="bg-success text-light p-4 rounded mb-3">
          <h5 className="mb-3">🎯 Suggested Plan</h5>
          
          <p><strong>Suggested Club:</strong> {club}</p>
          <p><strong>Recommended Coach:</strong> {coach}</p>
          <p><strong>Training Plan:</strong> {plan}</p>
          <p><strong>Coach's Phone:</strong> {coachPhone}</p>
          <p><strong>Club Address:</strong> {clubAddress}</p>
        </div>

        {/* Nearby Clubs */}
        <div className="bg-warning p-4 rounded mb-3">
          <h5 className="mb-3">📍 Nearby Clubs</h5>
          <ul>
            {nearbyClubs.map((nearbyClub, index) => (
              <li key={index}>{nearbyClub}</li>
            ))}
          </ul>
        </div>

        {/* Extra details */}
        <div className="bg-info text-light p-4 rounded mb-3">
          <h5 className="mb-3">📝 Additional Information</h5>
          <p>
            Based on your age, skill level, and financial status, we have curated a comprehensive training
            plan and club suggestions to help you excel in your sport. 
          </p>
          <p>
            Our recommendation is designed to maximize your potential while considering your preferences 
            and the available resources.
          </p>
        </div>

        <button className="btn btn-primary w-100 mt-4" onClick={() => navigate("/sportrouteform")}>
          Plan Another Route
        </button>
      </div>
    </div>
  );
};

export default SportRouteResult;
