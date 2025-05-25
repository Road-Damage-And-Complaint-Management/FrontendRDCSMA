import React, { useEffect, useState } from "react";

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Complaints</h2>

      {loading && <p style={styles.message}>Loading complaints...</p>}
      {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}
      {!loading && !error && complaints.length === 0 && <p style={styles.message}>No complaints found.</p>}

      <div style={styles.grid}>
        {complaints.map((c) => (
          <div key={c._id} style={styles.card}>
            <img
              src={`http://127.0.0.1:5000/uploads/${c.detected_image}`}
              alt="Detected"
              style={styles.image}
            />
            <div style={styles.details}>
              <p><strong>📍 Location:</strong> {c.location}</p>
              <p><strong>🧱 Crack Type:</strong> {c.crack_type}</p>
              <p><strong>💥 Crack Points:</strong> {c.crack_points}</p>
              <p>
                <strong>📌 Status:</strong>{" "}
                <span style={{ color: c.status === "Pending" ? "#e67e22" : "#27ae60" }}>
                  {c.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "30px 20px",
    background: "linear-gradient(135deg, #f9f9f9, #eef2f3)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  details: {
    padding: "15px 20px",
    fontSize: "16px",
    color: "#34495e",
    lineHeight: "1.6",
  },
};

export default UserComplaints;
