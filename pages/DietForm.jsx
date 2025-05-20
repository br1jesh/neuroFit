import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const DietForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietType: "",
    allergies: "",
    healthConditions: "",
    workoutType: "",
    caloricGoal: "",
    activityLevel: "",
    mealPreferences: "",
    foodRestrictions: "",
    waterIntake: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate Numeric Fields
    if (formData.age <= 0 || formData.height <= 0 || formData.weight <= 0) {
      Swal.fire("Invalid Input", "Age, height, and weight must be positive values.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/diet/create", formData);

      Swal.fire({
        title: "Success!",
        text: "Your diet plan has been generated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/result", { state: { dietData: response.data } });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to fetch diet data.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Error fetching diet data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4">Personalized Diet Planner</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name & Age */}
            <div className="col-md-6">
              <input type="text" className="form-control" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="number" className="form-control" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            </div>

            {/* Gender & Height */}
            <div className="col-md-6">
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-md-6">
              <input type="number" className="form-control" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
            </div>

            {/* Weight & Diet Type */}
            <div className="col-md-6">
              <input type="number" className="form-control" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <select className="form-select" name="dietType" value={formData.dietType} onChange={handleChange} required>
                <option value="">Select Diet Type</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranean">Mediterranean</option>
              </select>
            </div>

            {/* Allergies & Health Conditions */}
            <div className="col-md-6">
              <input type="text" className="form-control" name="allergies" placeholder="Allergies (comma separated)" value={formData.allergies} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" name="healthConditions" placeholder="Health Conditions" value={formData.healthConditions} onChange={handleChange} />
            </div>

            {/* Workout Type & Caloric Goal */}
            <div className="col-md-6">
              <select className="form-select" name="workoutType" value={formData.workoutType} onChange={handleChange} required>
                <option value="">Select Workout Type</option>
                <option value="strength">Strength</option>
                <option value="endurance">Endurance</option>
                <option value="cardio">Cardio</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div className="col-md-6">
              <select className="form-select" name="caloricGoal" value={formData.caloricGoal} onChange={handleChange} required>
                <option value="">Select Caloric Goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="muscle_gain">Muscle Gain</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="col-md-6">
              <select className="form-select" name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary (Little to No Exercise)</option>
                <option value="light">Light Activity (1-3 days/week)</option>
                <option value="moderate">Moderate Activity (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
              </select>
            </div>

            {/* Meal Preferences */}
            <div className="col-md-6">
              <input type="text" className="form-control" name="mealPreferences" placeholder="Meal Preferences (e.g., Breakfast, Dinner)" value={formData.mealPreferences} onChange={handleChange} />
            </div>

            {/* Food Restrictions */}
            <div className="col-md-6">
              <input type="text" className="form-control" name="foodRestrictions" placeholder="Food Restrictions (e.g., No Sugar)" value={formData.foodRestrictions} onChange={handleChange} />
            </div>

            {/* Water Intake Goal */}
            <div className="col-md-6">
              <input type="number" className="form-control" name="waterIntake" placeholder="Water Intake (Liters per day)" value={formData.waterIntake} onChange={handleChange} />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Generating..." : "Generate Diet Plan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietForm;
