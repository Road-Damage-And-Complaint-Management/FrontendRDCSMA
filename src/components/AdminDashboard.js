import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports");
                let fetchedReports = response.data.reports;

                // Step 1: Create a map to track location_id and match count
                const locationMap = new Map();

                fetchedReports.forEach((report) => {
                    const key = `${report.location}-${report.crack_type}`;
                    if (!locationMap.has(key)) {
                        locationMap.set(key, { count: 0, userIds: new Set() });
                    }
                    let entry = locationMap.get(key);

                    // Increase count if a different user reports the same location_id & crack_type
                    if (!entry.userIds.has(report.user_email)) {
                        entry.count++;
                        entry.userIds.add(report.user_email);
                    }
                });

                // Step 2: Assign priority scores
                fetchedReports = fetchedReports.map((report) => {
                    const key = `${report.location}-${report.crack_type}`;
                    const matchData = locationMap.get(key) || { count: 0 };

                    let priorityScore = 0;

                    // 1st Priority: Depth-Based Scoring (Higher depth gets 10 points)
                    const depthValue = report.depth_points?.[0] || 0;
                    if (depthValue > 0) {
                        priorityScore += 10;
                    }

                    // 2nd Priority: Location & Crack Type Match Scoring (If different users reported same location)
                    if (matchData.count >= 2) {
                        priorityScore += 10; // High priority for multiple user reports
                    }

                    return {
                        ...report,
                        priorityScore,
                        depth: depthValue,
                    };
                });

                // Step 3: Sort reports by:
                // 1. Priority Score (Higher first)
                // 2. Depth (Higher first, if scores are equal)
                fetchedReports.sort((a, b) => {
                    if (b.priorityScore !== a.priorityScore) {
                        return b.priorityScore - a.priorityScore; // Sort by highest priority score
                    }
                    return b.depth - a.depth; // If same score, sort by depth
                });

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
                            <th>Crack Type</th>
                            <th>GPS Coordinates</th>
                            <th>Depth</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report._id} className={
                                    report.priorityScore >= 20 ? "priority-high" :
                                    report.priorityScore >= 10 ? "priority-medium" :
                                    "priority-low"
                                }>
                                    <td>{report._id}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/uploads/${report.filename}`}
                                            alt="Detected Crack"
                                            className="report-img"
                                        />
                                    </td>
                                    <td>{report.location}</td>
                                    <td>{report.crack_type}</td>
                                    <td>{report.gps_latitude}, {report.gps_longitude}</td>
                                    <td>{report.depth !== 0 ? report.depth : "N/A"}</td>
                                    <td>{report.priorityScore}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No reports available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
