import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";  // Import the new CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Road Complaint Portal</h2>
            </div>
            
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/user-dashboard">User Dashboard</Link>
                <Link to="/admin-login">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
