import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from "recharts";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #000 50%, rgb(99, 82, 71) 50%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 1100px;
  text-align: center;
  transition: 0.3s;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  width: 200px;
  font-size: 15px;
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: rgb(42, 209, 37);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #b99a31;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 15px 25px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
  color: green;
  font-weight: bold;
`;

const ProgressTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #007bff;
    color: white;
    font-size: 16px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

// Main Component
const WorkoutTrackerDashboard = () => {
  const [watchData, setWatchData] = useState([]);
  const [userInput, setUserInput] = useState({
    currentWeight: "",
    targetWeight: "",
    dailySleep: "",
    currentBodyFat: "",
    targetBodyFat: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setWatchData(generateMockSmartwatchData());
  }, []);

  function generateMockSmartwatchData() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => ({
      day,
      calories: Math.floor(200 + Math.random() * 400),
      steps: Math.floor(5000 + Math.random() * 10000),
      sleep: Math.floor(5 + Math.random() * 4),
      heartRate: Math.floor(60 + Math.random() * 40),
    }));
  }

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <Container>
      {showPopup && <Popup>Data Submitted Successfully!</Popup>}

      {/* User Input Section */}
      <Section>
        <Title>Enter Your Fitness Goals</Title>
        <InputContainer>
          <Input type="number" name="currentWeight" placeholder="Current Weight (kg)" onChange={handleInputChange} />
          <Input type="number" name="targetWeight" placeholder="Target Weight (kg)" onChange={handleInputChange} />
          <Input type="number" name="dailySleep" placeholder="Daily Sleep (hrs)" onChange={handleInputChange} />
          <Input type="number" name="currentBodyFat" placeholder="Current Body Fat (%)" onChange={handleInputChange} />
          <Input type="number" name="targetBodyFat" placeholder="Target Body Fat (%)" onChange={handleInputChange} />
          <Button onClick={handleSubmit}>Submit</Button>
        </InputContainer>
      </Section>

      {/* Monthly Target Section */}
      <Section>
        <Title>Monthly Target</Title>
        <ProgressTable>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Current</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Weight (kg)</td><td>75</td><td>70</td></tr>
            <tr><td>Body Fat (%)</td><td>20</td><td>15</td></tr>
          </tbody>
        </ProgressTable>
      </Section>

      {/* Workout & Steps Progress */}
      <Section>
        <Title>Workout & Steps Progress</Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={watchData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="rgb(42, 95, 126)" name="Calories Burned" />
            <Line type="monotone" dataKey="steps" stroke="rgb(152, 189, 20)" name="Steps Taken" />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      {/* Heart Rate & Cardio Analysis */}
      <Section>
        <Title>Heart Rate & Cardio Analysis</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={watchData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="heartRate" fill="#dc3545" name="Heart Rate (bpm)" />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* Sleep & Recovery Progress */}
      <Section>
        <Title>Sleep & Recovery Progress</Title>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={watchData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="sleep" stroke="rgb(42, 95, 126)" fill="rgb(152, 189, 20)" name="Sleep Hours" />
          </AreaChart>
        </ResponsiveContainer>
      </Section>
    </Container>
  );
};

export default WorkoutTrackerDashboard;
