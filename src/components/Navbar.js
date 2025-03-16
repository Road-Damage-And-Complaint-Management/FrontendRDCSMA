import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">🚧 Road Damage Detection</h2>
            <div className="nav-links">
                <Link to="/" className="nav-link">🏠 Home</Link>
                <Link to="/user-dashboard" className="nav-link">👤 User</Link>
                <Link to="/admin-login" className="nav-link">🛠 Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
