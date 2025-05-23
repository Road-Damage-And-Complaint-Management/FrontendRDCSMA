import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLogin.css";

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        sessionStorage.setItem("admin_logged_in", "true");
        setIsAdminLoggedIn(true);
        navigate("/admin-dashboard");
      } else {
        setError(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Login failed. Server is unreachable or credentials are wrong.");
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
            autoComplete="username"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label="Toggle password visibility"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
