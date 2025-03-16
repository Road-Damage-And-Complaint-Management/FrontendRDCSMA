import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./components/AdminDashboard"; // Moved to 'pages' for better structure
import AdminLogin from "./components/AdminLogin"; // Admin Login Page
import LandingPage from "./pages/LandingPage"; // Separated Landing Page
import Navbar from "./components/Navbar"; // Navbar Component
import "./App.css";  

const App = () => {
    const isAdminLoggedIn = sessionStorage.getItem("admin_logged_in") === "true"; // Use sessionStorage for better security

    return (
        <Router>
            <div className="app-container">
                <Navbar /> {/* Added Navbar for navigation */}
                
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    
                    {/* Protect Admin Dashboard Route */}
                    <Route path="/admin-dashboard" element={isAdminLoggedIn ? <AdminLogin /> : <Navigate to="/admin-login" />} />
                    
                    {/* Admin Login Route */}
                    <Route path="/admin-login" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
