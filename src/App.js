import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar"; 
import UserComplaint from "./components/UserComplaint";
import "./App.css";

const AppContent = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
    const location = useLocation();

    const showNavbar = ["/", "/admin-dashboard"].includes(location.pathname);
    const showUserNavbar = location.pathname === "/user-dashboard";

    return (
        <div className="app-container">
            {showNavbar && <Navbar isAdminLoggedIn={isAdminLoggedIn} />}
            {showUserNavbar && <UserNavbar />}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-complaint" element={<UserComplaint/>} />
                <Route
                    path="/admin-dashboard"
                    element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />}
                />
                <Route path="/admin-login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

const App = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        setIsAdminLoggedIn(sessionStorage.getItem("admin_logged_in") === "true");
    }, []);

    return (
        <Router>
            <AppContent isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
        </Router>
    );
};

export default App;
