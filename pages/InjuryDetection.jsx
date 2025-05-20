import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InjuryDetection = () => {
  const [file, setFile] = useState(null);
  const [exercise, setExercise] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a valid video file.");
    }
  };

  const handleExerciseChange = (e) => {
    setExercise(e.target.value);
  };

  const checkBackendHealth = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!file || !exercise) {
      setError("Please upload a video and select an exercise type.");
      return;
    }

    setLoading(true);
    setError(null);

    // Check if Spring Boot is running
    const isSpringBootUp = await checkBackendHealth("http://localhost:8080/health");
    if (!isSpringBootUp) {
      setError("Spring Boot is not running. Please start the backend.");
      setLoading(false);
      return;
    }

    // Check if Flask is running
    const isFlaskUp = await checkBackendHealth("http://localhost:5001/health");
    if (!isFlaskUp) {
      setError("Flask is not running. Please start the Flask server.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("exercise", exercise);

    try {
      const response = await fetch("http://localhost:8080/api/upload", {  // ✅ Correct URL
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction. Check backend logs.");
      }

      const data = await response.json().catch(() => {
        throw new Error("Invalid server response. Check backend logs.");
      });

      setResult({
        riskPercentage: data.risk_percentage,
        recommendation: data.recommendation,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg,rgb(106, 106, 128), #16213e)",
        color: "#fff",
      }}
    >
      <div className="p-5 rounded shadow-lg" style={{ width: "400px", background: "#222", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">🏋️ Injury Prediction</h2>

        <div className="mb-3">
          <label className="form-label">Select Exercise</label>
          <select className="form-select bg-dark text-light" value={exercise} onChange={handleExerciseChange}>
            <option value="">Choose Exercise</option>
            {['squat', 'deadlift', 'tennis_serve', 'pushup', 'bench_press'].map((ex) => (
              <option key={ex} value={ex}>{ex.replace('_', ' ').toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Video</label>
          <input type="file" accept="video/*" className="form-control bg-dark text-light" onChange={handleFileChange} />
          {file && <p className="text-info mt-2">Selected: {file.name}</p>}
        </div>

        {error && <p className="text-danger text-center">{error}</p>}
        
        <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading || error}>
          {loading ? "Analyzing..." : "Analyze Injury Risk"}
        </button>

        {result && (
          <div className="mt-4 p-3 rounded bg-dark text-light">
            <h4 className="text-center">Prediction Result:</h4>
            <p>⚠️ Injury Risk: <strong>{result.riskPercentage}%</strong></p>
            <p>💡 Recommendation: <strong>{result.recommendation}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InjuryDetection;
