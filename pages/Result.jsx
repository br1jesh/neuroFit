import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve diet data from state or local storage
  const storedPlan = localStorage.getItem("dietPlan");
  const [dietPlan, setDietPlan] = useState(location.state?.dietData || (storedPlan ? JSON.parse(storedPlan) : null));

  useEffect(() => {
    if (dietPlan) {
      // Save to local storage to persist after refresh
      localStorage.setItem("dietPlan", JSON.stringify(dietPlan));
    }
  }, [dietPlan]);

  // Handle missing diet plan
  if (!dietPlan) {
    return (
      <div className="text-center mt-5">
        <h2>No diet plan available.</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/diet-form")}>
          Go Back
        </button>
      </div>
    );
  }

  // Ensure meal plan is an array
  const meals = Array.isArray(dietPlan.mealPlan) ? dietPlan.mealPlan : JSON.parse(dietPlan.mealPlan);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(135deg, rgb(106, 106, 128), #16213e)", color: "#fff" }}
    >
      <div className="p-5 rounded shadow-lg" style={{ width: "650px", background: "#222", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">🥗 Personalized Diet Plan for {dietPlan.name}</h2>

        <div className="bg-dark text-light p-3 rounded">
          <p><strong>Age:</strong> {dietPlan.age}</p>
          <p><strong>Gender:</strong> {dietPlan.gender}</p>
          <p><strong>Height:</strong> {dietPlan.height} cm</p>
          <p><strong>Weight:</strong> {dietPlan.weight} kg</p>
          <p><strong>Diet Type:</strong> {dietPlan.dietType}</p>
          <p><strong>Caloric Goal:</strong> {dietPlan.caloricGoal}</p>
          <p><strong>Workout Type:</strong> {dietPlan.workoutType}</p>
          <p><strong>Diabetes:</strong> {dietPlan.diabetes ? "Yes" : "No"}</p>
          <p><strong>Blood Pressure:</strong> {dietPlan.bloodPressure ? "Yes" : "No"}</p>
        </div>

        <h4 className="mt-4">📅 Meal Plan</h4>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Food</th>
              <th>Grams</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fats</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={index}>
                <td>{meal.meal}</td>
                <td>{meal.food}</td>
                <td>{meal.grams}g</td>
                <td>{meal.calories}</td>
                <td>{meal.protein}g</td>
                <td>{meal.carbs}g</td>
                <td>{meal.fats}g</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/diet-form")}>
          Generate Another Plan
        </button>
      </div>
    </div>
  );
};

export default Result;
