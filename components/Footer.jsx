import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Using react-icons for social media icons

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-5"
      style={{
        background: "linear-gradient(135deg, #333, #555)", 
        fontFamily: "'Poppins', sans-serif",
        borderTop: "2px solid #fff",  // Adding a subtle border on top for separation
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Column 1: Brand Info */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3 text-white">Nuro Fit</h4>
            <p>
              Achieve your fitness goals with us. Join today and become a part
              of our fitness family.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#home"
                  className="text-light text-decoration-none hover-link"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#about"
                  className="text-light text-decoration-none hover-link"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#membership"
                  className="text-light text-decoration-none hover-link"
                >
                  Membership
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contact"
                  className="text-light text-decoration-none hover-link"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social Icons */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <p>
              Email:{" "}
              <a
                href="mailto:info@nurofit.com"
                className="text-light text-decoration-none"
              >
                info@nurofit.com
              </a>
            </p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Fitness St, Gym City</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="#" className="text-light me-3 social-icon" aria-label="Facebook">
                <FaFacebook size={28} />
              </a>
              <a href="#" className="text-light me-3 social-icon" aria-label="Twitter">
                <FaTwitter size={28} />
              </a>
              <a href="#" className="text-light me-3 social-icon" aria-label="Instagram">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p className="mb-0">© 2024 Nuro Fit — All Rights Reserved</p>
          <p className="mb-0">Designed with love to help you stay fit!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
