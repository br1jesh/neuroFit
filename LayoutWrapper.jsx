// src/LayoutWrapper.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ["/", "/login", "/signup"];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
