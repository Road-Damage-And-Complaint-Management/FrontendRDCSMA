import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
    
        try {
            const response = await axios.post("http://localhost:5000/admin/login", {
                email,
                password,
            }, { withCredentials: true });
    
            if (response.data.success) {
                sessionStorage.setItem("admin_logged_in", "true");
                navigate("/admin-dashboard"); // ✅ Redirect to dashboard
            } else {
                setError(response.data.message || "Invalid email or password.");
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🔒"}
                        </span>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
