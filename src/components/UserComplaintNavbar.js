import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const fetchUserComplaints = async () => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      setError("User not logged in");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/complaints/${username}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();
      setComplaints(result.complaints);
    } catch (err) {
      console.error("❌ Failed to fetch user complaints:", err);
      setError("Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  return (
    <div style={styles.page}>
      {/* Fixed Top Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Road Complaint Portal</h2>
        <button
          style={{
            ...styles.backButton,
            backgroundColor: hover ? "#e74c3c" : styles.backButton.backgroundColor,
            color: hover ? "#fff" : styles.backButton.color,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate("/upload")}
        >
          ← Back to Upload
        </button>
      </div>

      <h1 style={styles.title}>Your Complaints</h1>

      {loading && <p style={styles.infoText}>Loading complaints...</p>}
      {error && <p style={{ ...styles.infoText, color: "red" }}>{error}</p>}
      {!loading && !error && complaints.length === 0 && (
        <p style={styles.infoText}>No complaints found.</p>
      )}

      <div style={styles.grid}>
        {complaints.map((c) => (
          <div
            key={c._id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <div style={styles.cardBody}>
              <div style={styles.row}><strong>📍 Location:</strong> {c.location}</div>
              <div style={styles.row}><strong>🧱 Crack Type:</strong> {c.crack_type}</div>
              <div style={styles.row}><strong>💥 Crack Points:</strong> {c.crack_points}</div>
              <div style={styles.row}>
                <strong>📌 Status:</strong>{" "}
                <span style={{ color: c.status === "Pending" ? "#e67e22" : "#27ae60" }}>
                  {c.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "100px 40px 40px", // Add top padding for fixed navbar
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box",
  },
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "rgb(0, 69, 179)",
    color: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#ecf0f1",
    color: "#2c3e50",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px",
  },
  infoText: {
    fontSize: "18px",
    textAlign: "center",
    margin: "20px 0",
    color: "#555",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    width: "340px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
  },
  cardBody: {
    padding: "20px",
    fontSize: "16px",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    lineHeight: "1.6",
  },
};

export default UserComplaints;
