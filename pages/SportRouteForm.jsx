import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const SportRouteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    sport: "",
    skillLevel: "",
    duration: "",
    location: "",
    coachPreference: "",
    trainingType: "",
    healthIssues: "",
    goal: "",
    experienceYears: "",
    academyPreference: "",
    financialStatus: "",
    weight: "",
    height: "",
    dietaryPreference: "",
    equipmentPreference: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input values
    if (formData.age <= 0 || formData.duration <= 0 || formData.experienceYears < 0) {
      Swal.fire("Invalid Input", "Age, duration, and experience must be valid values.", "error");
      setLoading(false);
      return;
    }

    try {
      // Sending data to backend
      const response = await axios.post("http://localhost:8080/api/sport-route/generate", formData);
      
      // Navigate to result page and pass the generated sport plan
      navigate("/sport-result", { state: { sportData: response.data.sportPlan } });

      Swal.fire({
        title: "Success!",
        text: "Your sport route has been planned successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create sport route.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Error creating sport route:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "650px", width: "100%" }}>
        <h2 className="text-center mb-4">Create Your Sport Route</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name & Age */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender & Sport */}
            <div className="col-md-6">
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              >
                <option value="">Select Sport</option>
                <option value="ranji_cricket">Ranji Cricket</option>
                <option value="football">Football</option>
                <option value="badminton">Badminton</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
                <option value="volleyball">Volleyball</option>
              </select>
            </div>

            {/* Skill Level & Duration */}
            <div className="col-md-6">
              <select
                className="form-select"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                required
              >
                <option value="">Skill Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="duration"
                placeholder="Session Duration (in mins)"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location & Coach Preference */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Your location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
           

            {/* Health Issues, Goals, Experience */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="healthIssues"
                placeholder="Any Health Issues"
                value={formData.healthIssues}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="goal"
                placeholder="Your Sports Goal"
                value={formData.goal}
                onChange={handleChange}
              />
            </div>

            {/* Years of Experience & Emergency Contact */}
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="experienceYears"
                placeholder="Years of Experience"
                value={formData.experienceYears}
                onChange={handleChange}
              />
            </div>
          
            {/* Physical Fitness Assessment */}
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            {/* Dietary Preferences and Equipment */}
            <div className="col-md-6">
              <select
                className="form-select"
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
              >
                <option value="">Dietary Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten-Free</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
              </select>
            </div>
           

            {/* Financial Status */}
            <div className="col-md-6">
              <select
                className="form-select"
                name="financialStatus"
                value={formData.financialStatus}
                onChange={handleChange}
              >
                <option value="">Select Financial Status</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
            {loading ? "Submitting..." : "Create Sport Route"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SportRouteForm;
