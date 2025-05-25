import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";  // Import the new CSS

const UserNavbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Road Complaint Portal</h2>
            </div>
            
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/user-dashboard">User Dashboard</Link>
                <Link to="/user-complaint">View Complaint</Link>
            </div>
        </nav>
    );
};

export default UserNavbar;
