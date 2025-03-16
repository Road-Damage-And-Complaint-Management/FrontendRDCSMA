import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import "./App.css";  

const App = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        setIsAdminLoggedIn(sessionStorage.getItem("admin_logged_in") === "true");
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Navbar isAdminLoggedIn={isAdminLoggedIn} />
                
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    
                    {/* Protected Admin Route - Fixed redirect to admin-login */}
                    <Route 
                        path="/admin-dashboard" 
                        element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />} 
                    />
                    <Route path="/admin-login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    
                    {/* Catch-all route for undefined paths */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;