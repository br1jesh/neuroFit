import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { FaPlay, FaStop, FaVolumeUp } from "react-icons/fa";

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [poseData, setPoseData] = useState(null);
  const [poseAngle, setPoseAngle] = useState(null);
  const [poseFeedback, setPoseFeedback] = useState("Waiting for analysis...");
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("black");
  const [countdown, setCountdown] = useState(3);
  
  function calculateAngle(A, B, C) {
    let radians =
      Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180) / Math.PI);
    return angle > 180 ? 360 - angle : angle;
  }

  const captureFrame = useCallback(async () => {
    if (!webcamRef.current || !isWebcamActive) return;
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append("frame", blob);

      const response = await fetch("http://127.0.0.1:5001/process_frame", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Failed to process frame: ${response.status}`);
      
      const data = await response.json();
      setPoseData(data);
    } catch (error) {
      console.error("❌ Error sending frame:", error);
    }
  }, [isWebcamActive]);

  useEffect(() => {
    if (!isWebcamActive) return;
    const interval = setInterval(captureFrame, 500);
    return () => clearInterval(interval);
  }, [captureFrame, isWebcamActive]);

  useEffect(() => {
    if (!poseData || !poseData.landmarks) return;
    const { landmarks } = poseData;
    if (!landmarks[24] || !landmarks[26] || !landmarks[28]) {
      setPoseFeedback("⚠️ Lower body not detected!");
      setFeedbackColor("orange");
      return;
    }
    const hip = landmarks[24];
    const knee = landmarks[26];
    const ankle = landmarks[28];
    const kneeAngle = calculateAngle(hip, knee, ankle);

    let feedback = "";
    let color = "black";
    let isCorrect = false;

    if (kneeAngle > 165) {
      feedback = "🔼 Raise slightly!";
      color = "red";
    } else if (kneeAngle > 155) {
      feedback = "🔼 Slightly lower!";
      color = "orange";
    } else if (kneeAngle > 140) {
      feedback = "⬇️ Go lower!";
      color = "orange";
    } else if (kneeAngle < 90) {
      feedback = "⚠️ Squat too deep!";
      color = "red";
    } else {
      feedback = "✅ Perfect squat!";
      color = "green";
      isCorrect = true;
    }

    setPoseAngle(kneeAngle);
    setPoseFeedback(feedback);
    setFeedbackColor(color);

    if (isCorrect) {
      setRightCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  }, [poseData]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.webcamContainer}>
          <h2>📹 Live Webcam</h2>
          {isWebcamActive && <Webcam ref={webcamRef} style={styles.webcam} />}
          {isWebcamActive && countdown > 0 && (
            <p style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}>
              Analysis starts in {countdown}...
            </p>
          )}
          <button style={styles.button} onClick={() => setIsWebcamActive((prev) => !prev)}>
            {isWebcamActive ? <FaStop /> : <FaPlay />} {isWebcamActive ? "Stop Webcam" : "Start Webcam"}
          </button>
        </div>

        <div style={styles.analysisContainer}>
          <h3>📊 Pose Analysis</h3>
          <p><strong>✅ Correct Squats:</strong> {rightCount}</p>
          <p><strong>❌ Incorrect Squats:</strong> {wrongCount}</p>
          {poseAngle !== null && <p><strong>📐 Knee Angle:</strong> {poseAngle.toFixed(2)}°</p>}
          <p style={{ ...styles.feedback, color: feedbackColor }}>{poseFeedback}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1e1e1e",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
  webcamContainer: { textAlign: "center" },
  webcam: {
    width: "100%",
    maxWidth: "650px",
    height: "450px",
    borderRadius: "10px",
  },
  button: {
    backgroundColor: "#FFD700",
    color: "black",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },
  analysisContainer: {
    padding: "20px",
    borderRadius: "20px",
    color: "#0e0d0d",
    textAlign: "left",
    fontSize: "18px",
  },
  feedback: { fontSize: "20px", fontWeight: "bold" },
};

export default WebcamFeed;
