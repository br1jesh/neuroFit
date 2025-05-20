// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Call backend API to get user profile
    axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming JWT token stored
      }
    })
    .then((response) => setUser(response.data))
    .catch((error) => console.error("Not logged in or error:", error));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
