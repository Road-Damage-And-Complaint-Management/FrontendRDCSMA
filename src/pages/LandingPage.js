import React from "react";
import { Link } from "react-router-dom";
import logo from "./mincpal-Logo.png"; // Adjust path as needed
import "../styles/LandingPage.css";
import bgImage from "../pages/pothole-repair.jpg"; // Adjust the path if needed


const images = [
  "https://static.toiimg.com/thumb/msid-121194171,width-1280,height-720,resizemode-4/121194171.jpg",
  "https://lawlex.org/wp-content/uploads/2020/07/Pothole.jpg",
  "https://www.hindustantimes.com/ht-img/img/2025/04/09/1600x900/A-damaged-road-in-Maurice-Nagar--near-Delhi-Univer_1744224301157.jpg",
  "https://th-i.thgim.com/public/news/cities/Tiruchirapalli/8lf07j/article29814825.ece/alternates/FREE_1200/TY29BADROAD-2",
];

const LandingPage = () => {
  return (
    <div
      style={{
  width: "95vw",       // wider, 95% of viewport width
  maxWidth: "1400px",  // max width increased to 1100px
  minHeight: "100vh",
  margin: "40px auto",
  padding: "10px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#0d3b66",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "overlay",
  borderRadius: "12px",
  boxShadow: "50px 50px 50px rgba(0,0,0,0.1)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
  bborder: "20px solid black"
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
            borderRadius: "12px",
            backgroundColor:"rgba(255, 255, 255, 0.7)",
             margin: 0,
            padding: 0,
          }}
        >
          Road Damage Detection & Management Portal
        </h1>
      </header>

      {/* Image Train Slider */}
      <div
        style={{
          position: "relative",
          margin: "30px auto 30px",
          width: "100%",
          height: "300px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // white with 50% opacity
          marginBottom: "15px",
          paddingBottom: "30px",
  }}
      >
        <div className="slider-track">
          
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img}
              
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          ))}
        </div>
      </div>

      {/* Role Buttons */}
      <div style={{ marginBottom: "30px" }}>
        <p
      style={{
          
          marginBottom: "15px",
          color: "black",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          display: "inline-block", // ✅ THIS is the key!
          padding: "5px 5px",     // optional: adds nice spacing around text
          borderRadius: "10px"     // optional: smooth rounded edges
      }}
      >
          Select your role to proceed:
        </p>
        <Link to="/user-dashboard" style={roleButtonStyle}>
          User Dashboard
        </Link>
        <Link
          to="/admin-login"
          style={{
            ...roleButtonStyle,
            background: "linear-gradient(to right, #4b6cb7, #182848)",
          }}
        >
          Admin Login
        </Link>
      </div>

      {/* Footer Marquee */}
      <footer
        style={{
          fontSize: "15px",
          color: "white",
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
      </footer>
    </div>
  );
};

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
