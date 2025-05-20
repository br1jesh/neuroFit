import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import profileIcon from '../assets/profile_icon.png';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMouseEnter = () => setIsProfileOpen(true);
  const handleMouseLeave = () => setIsProfileOpen(false);
  

  const userData = {
    name: "Brijesh Mavani",
    profilePic: profileIcon
  };

  // Inline CSS for Profile Dropdown
  const dropdownStyles = {
    container: {
      right: 0,
      top: "55px",
      width: "220px",
      zIndex: 1000,
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      background: "white",
    },
    item: {
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      color: "#333",
      textDecoration: "none",
      fontSize: "15px",
    },
    itemHover: {
      background: "#f1f1f1",
    },
    borderBottom: {
      borderBottom: "1px solid #eaeaea",
    },
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="NuroFit Logo"
            style={{ height: "50px", width: "50px", borderRadius: "8px" }}
          />
          <span className="fs-3 fw-bold text-light ms-2">NuroFit</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div
          className="collapse navbar-collapse justify-content-end align-items-center"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/workout-tracking">
                Workout Tracker
              </Link>
            </li>

            {/* Cart Icon */}
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link text-light position-relative"
              >
                <FaShoppingCart size={24} />
              </Link>
            </li>

            {/* Profile Dropdown */}
            <li
              className="nav-item position-relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-link text-light p-0">
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ height: "40px", width: "40px", objectFit: "cover" }}
                />
              </div>

              {isProfileOpen && (
                <div
                  className="position-absolute"
                  style={dropdownStyles.container}
                >
                  <div
                    className="d-flex align-items-center p-3"
                    style={dropdownStyles.borderBottom}
                  >
                    <img
                      src={userData.profilePic}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{
                        height: "45px",
                        width: "45px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="fw-bold">{userData.name}</span>
                  </div>
                  <ul className="list-unstyled m-0">
                    {[
                      {
                        to: "/profile",
                        icon: <FaUser />,
                        text: "Edit Profile",
                      },
                      {
                        to: "/settings",
                        icon: <FaCog />,
                        text: "Settings & Privacy",
                      },
                      {
                        to: "/help",
                        icon: <FaQuestionCircle />,
                        text: "Help & Support",
                      },
                      { to: "/logout", icon: <FaSignOutAlt />, text: "Logout" },
                    ].map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.to}
                          className="dropdown-item"
                          style={dropdownStyles.item}
                          onMouseEnter={(e) =>
                            (e.target.style.background = "#f1f1f1")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.background = "white")
                          }
                        >
                          {item.icon} <span className="ms-2">{item.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
