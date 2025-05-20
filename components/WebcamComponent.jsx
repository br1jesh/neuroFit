import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaPlay, FaStop } from "react-icons/fa";
import "./WebcamFeed.css";

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const [poseData, setPoseData] = useState(null);
  const [poseAngle, setPoseAngle] = useState(null);
  const [poseFeedback, setPoseFeedback] = useState("Getting Started...");
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("black");
  const [isSquatting, setIsSquatting] = useState(false);
  const [lastSquatTime, setLastSquatTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamOn, setWebcamOn] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  
  function calculateAngle(A, B, C) {
    let radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs(radians * (180.0 / Math.PI));
    return angle > 180 ? 360 - angle : angle;
  }

  const captureFrame = useCallback(async () => {
    if (!webcamRef.current || !webcamOn) return;
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("frame", blob);
      const response = await fetch("http://127.0.0.1:5000/process_frame", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPoseData(data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error sending frame:", error);
    }
  }, [webcamOn]);

  useEffect(() => {
    if (!webcamOn) return;
    const interval = setInterval(() => {
      captureFrame();
    }, 500);
    return () => clearInterval(interval);
  }, [captureFrame, webcamOn]);

  useEffect(() => {
    if (!poseData || !poseData.landmarks) return;

    const landmarks = poseData.landmarks;
    if (!landmarks[24] || !landmarks[26] || !landmarks[28]) {
      setPoseFeedback("⚠️ Lower body not detected!");
      setFeedbackColor("orange");
      setPoseAngle(null);
      return;
    }

    const hip = landmarks[24];
    const knee = landmarks[26];
    const ankle = landmarks[28];
    const kneeAngle = calculateAngle(hip, knee, ankle);

    let feedback = "";
    let color = "black";
    let squatCompleted = false;
    let showAngle = true;
    let currentTime = new Date().getTime();

    if (kneeAngle > 165) {
      feedback = "🔼 Stand straight";
      color = "red";
      showAngle = false;
      if (isSquatting) {
        squatCompleted = true;
        setIsSquatting(false);
        setSessionCount((prev) => prev + 1);
        if (lastSquatTime) {
          let squatDuration = (currentTime - lastSquatTime) / 1000;
          if (squatDuration < 1) feedback += " - Too fast!";
          else if (squatDuration > 3) feedback += " - Too slow!";
        }
      }
    } else if (kneeAngle > 140) {
      feedback = "⬇️ Go lower!";
      color = "orange";
      setIsSquatting(true);
    } else if (kneeAngle < 90) {
      feedback = "⚠️ Squat too deep!";
      color = "red";
      setIsSquatting(true);
    } else {
      feedback = "✅ Perfect squat!";
      color = "green";
      setIsSquatting(true);
    }

    if (squatCompleted) {
      setLastSquatTime(currentTime);
      if (kneeAngle >= 90 && kneeAngle <= 160) {
        setRightCount((prev) => prev + 1);
      } else {
        setWrongCount((prev) => prev + 1);
      }
    }

    setPoseFeedback(feedback);
    setFeedbackColor(color);
    setPoseAngle(showAngle ? kneeAngle : null);
  }, [poseData]);

  return (
    <div className="webcam-wrapper">
      <div className="webcam-container">
        <div className="webcam-header">
          <h2>🏋️‍♂️ Squat Analysis</h2>
          <button className="webcam-toggle" onClick={() => setWebcamOn(!webcamOn)}>
            {webcamOn ? <FaStop /> : <FaPlay />} {webcamOn ? "Stop Webcam" : "Start Webcam"}
          </button>
        </div>
        {webcamOn && <Webcam ref={webcamRef} className="webcam" />}
        {loading ? (
          <h3 className="loading">🔄 Loading...</h3>
        ) : (
          <div className="analysis-box">
            <h3>📊 Pose Analysis:</h3>
            <p className="right-count">✅ Correct Squats: {rightCount}</p>
            <p className="wrong-count">❌ Incorrect Squats: {wrongCount}</p>
            <p className="session-count">🏁 Squat Sessions: {sessionCount}</p>
            {poseAngle !== null && <p className="angle">📐 Knee Angle: {poseAngle.toFixed(2)}°</p>}
            <p className="feedback" style={{ color: feedbackColor }}>{poseFeedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamFeed;
