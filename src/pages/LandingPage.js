import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./mincpal-Logo.png"; // Adjust path as needed

const images = [
  "https://source.roboflow.com/Gz7v4mrwkFc0RZyvlNVle4v2UyB2/03ZWi2lPK7gZ1ASOKFRH/original.jpg",
  "https://miro.medium.com/v2/resize:fit:1200/1*4MKCGzg8cb1It3wWZpz7yA.png",
  "https://miro.medium.com/v2/resize:fit:1080/1*e0Ui_SICFA1FG5WHINtaKg.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Py1o3v-fAtg7u2I7j4Tu2kIK-cJygJAGUVRKP-gEXI_nGMuYS4IlUtKZZomqzu2cGdo&usqp=CAU",
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        minHeight: "100vh",
        margin: "40px auto",
        padding: "10px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#0d3b66",
        backgroundColor: "#f0f4f8",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo and Title */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={logo}
          alt="Municipal Logo"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            fontFamily: "'Georgia', serif",
            color: "#003366",
            margin: 0,
          }}
        >
          Road Damage Detection & Management Portal
        </h1>
      </header>

      {/* Image Slider */}
      <div
        style={{
          position: "relative",
          margin: "0 auto 30px",
          width: "100%",
          height: "350px",
          maxHeight: "350px",
        }}
      >
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={navButtonStyle("left")}
        >
          &#8592;
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
          }}
        />

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={navButtonStyle("right")}
        >
          &#8594;
        </button>
      </div>

      {/* Role Buttons */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
          Select your role to proceed:
        </p>
        <Link to="/user-dashboard" style={roleButtonStyle}>
          User Dashboard
        </Link>
        <Link
          to="/admin-login"
          style={{ ...roleButtonStyle, background: "linear-gradient(to right, #4b6cb7, #182848)" }}
        >
          Admin Login
        </Link>
      </div>

      {/* Footer Marquee */}
      <footer
        style={{
          fontSize: "15px",
          color: "#ffffff",
          backgroundColor: "#0d3b66",
          padding: "10px 0",
          borderRadius: "6px",
          overflow: "hidden",
          position: "relative",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "scrollText 15s linear infinite",
            paddingLeft: "100%",
          }}
        >
          &copy; 2025 Municipal Corporation | This portal helps detect, manage, and
          monitor road damage across the city efficiently using AI technology.
        </div>
        <style>
          {`
            @keyframes scrollText {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </footer>
    </div>
  );
};

const navButtonStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "-40px",
  transform: "translateY(-50%)",
  backgroundColor: "#0d3b66",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  fontSize: "1.5rem",
  lineHeight: "40px",
  userSelect: "none",
  opacity: 0.8,
  transition: "opacity 0.3s",
  zIndex: 1,
});

const roleButtonStyle = {
  background: "linear-gradient(to right, #1e5f74, #2a7d8f)",
  color: "white",
  padding: "12px 25px",
  margin: "0 10px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "transform 0.2s",
  display: "inline-block",
};

export default LandingPage;
