import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reports.css"; // ✅ Import the CSS file
// ✅ Import CSS file

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/reports")
            .then(response => {
                setReports(response.data.reports);
            })
            .catch(error => {
                console.error("Error fetching reports:", error);
            });
    }, []);

    return (
        <div className="reports-container">
            <h2>📋 Road Damage Reports</h2>
            <div className="reports-grid">
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className="report-card">
                            <img 
                                src={`http://localhost:5000/uploads/${report.filename}`} 
                                alt="Road Damage" 
                                className="report-image" 
                            />
                            <div className="report-details">
                                <p><strong>📍 Location:</strong> {report.location}</p>
                                <p><strong>🛠 Crack Type:</strong> 
                                    <span className={report.crack_type === "Detected" ? "crack-detected" : "crack-none"}>
                                        {report.crack_type}
                                    </span>
                                </p>
                                <p><strong>📌 Crack Points:</strong> {report.crack_points}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-reports">No reports found.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;
