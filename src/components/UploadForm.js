import React, { useState } from "react";
import axios from "axios";
import "../styles/UploadForm.css";

const UploadForm = ({ closeForm }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadResponse({ error: "Please select a file to upload." });
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setUploadResponse(response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadResponse({ error: error.response?.data?.error || "Upload failed. Try again." });
        }
    };

    return (
        <div className="upload-container">
            <h2>📤 Upload Road Image</h2>
            <form onSubmit={handleUpload} className="upload-form">
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>

            {/* Display Upload Response */}
            {uploadResponse && (
                <div className="upload-result">
                    {uploadResponse.error ? (
                        <p className="error">❌ {uploadResponse.error}</p>
                    ) : (
                        <div className="success">
                            <h3>✅ Upload Successful!</h3>
                            <p><strong>Report ID:</strong> {uploadResponse._id}</p>
                            <p><strong>Crack Points:</strong> {uploadResponse.crack_points}</p>
                            <p><strong>Crack Type:</strong> {uploadResponse.crack_type}</p>
                            <p><strong>GPS Location:</strong> {uploadResponse.location}</p>
                            <p><strong>Status:</strong> {uploadResponse.status}</p>

                            {/* Display both Original and Detected Images */}
                            <div className="image-preview">
                                <div>
                                    <p><strong>Original Image</strong></p>
                                    <img 
                                        src={`http://localhost:5000${uploadResponse.original_image}`} 
                                        onError={(e) => e.target.src = "/placeholder.jpg"} 
                                        alt="Original Road Damage" 
                                    />
                                </div>
                                <div>
                                    <p><strong>Detected Image</strong></p>
                                    <img 
                                        src={`http://localhost:5000${uploadResponse.detected_image}`} 
                                        onError={(e) => e.target.src = "/placeholder.jpg"} 
                                        alt="Detected Road Damage" 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadForm;
