import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    // List of high-priority locations
    const highPriorityLocations = [
        "Saptapur", "HosaYellapurCross", "Gandhinagar", "Akkipeth",
        "ShriNagar", "Kalyanagar", "JubileeCircle", "TollNaka",
        "Vidyagiri", "Old SP Circle"
    ];

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports");
                let fetchedReports = response.data.reports;

                // Step 1: Identify the highest depth
                let highestDepth = 0;
                fetchedReports.forEach(report => {
                    const depthValue = report.depth_points?.[0] || 0;
                    if (depthValue > highestDepth) highestDepth = depthValue;
                });

                // Step 2: Count occurrences of each location (based on ID, not user)
                const locationCount = new Map();
                fetchedReports.forEach((report) => {
                    const key = report.location;
                    locationCount.set(key, (locationCount.get(key) || 0) + 1);
                });

                // Step 3: Assign priority points (10 points each)
                fetchedReports = fetchedReports.map((report) => {
                    let priorityScore = 0;

                    // 1st Priority: Highest Depth (10 points)
                    if ((report.depth_points?.[0] || 0) === highestDepth) {
                        priorityScore += 10;
                    }

                    // 2nd Priority: Multiple Reports at Same Location (10 points)
                    if (locationCount.get(report.location) > 1) {
                        priorityScore += 10;
                    }

                    // 3rd Priority: High-Priority Location (10 points)
                    if (highPriorityLocations.some(word => report.location.includes(word))) {
                        priorityScore += 10;
                    }

                    return {
                        ...report,
                        priorityScore,
                    };
                });

                // Step 4: Sorting based on priority (Higher First)
                fetchedReports.sort((a, b) => b.priorityScore - a.priorityScore);

                setReports(fetchedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h2>🛠 Admin Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="reports-container">
                <h3>Uploaded Reports</h3>
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Depth</th>
                            <th>Priority Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report._id}>
                                    <td>{report._id}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/uploads/${report.filename}`}
                                            alt="Detected Crack"
                                            className="report-img"
                                        />
                                    </td>
                                    <td>{report.location}</td>
                                    <td>{report.depth_points?.[0] || "N/A"}</td>
                                    <td>{report.priorityScore}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No reports available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
