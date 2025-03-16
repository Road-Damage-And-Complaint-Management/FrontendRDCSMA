import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";  

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1>🚧 Road Damage Detection System</h1>
            <p>Select your role to proceed:</p>
            <div className="btn-container">
                <Link to="/user-dashboard" className="nav-btn user-btn">👤 User Dashboard</Link>
                <Link to="/admin-login" className="nav-btn admin-btn">🛠 Admin Login</Link>
            </div>
        </div>
    );
};

export default LandingPage;
