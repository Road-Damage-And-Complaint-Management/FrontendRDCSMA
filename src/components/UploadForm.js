import React, { useState } from "react";
import axios from "axios";
import "../styles/UploadForm.css";

const UploadForm = ({ closeForm }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);  // ✅ Define state for response

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                console.log("✅ Upload successful:", result);
                setUploadResponse(result.data);  // ✅ Store response in state
            } else {
                console.error("❌ Upload failed:", result.error);
                setUploadResponse({ error: result.error });  // ✅ Handle error response
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            setUploadResponse({ error: "Network error. Please try again." });
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>

            {/* ✅ Show upload response */}
            {uploadResponse && (
                <div className="upload-result">
                    {uploadResponse.error ? (
                        <p className="error">❌ {uploadResponse.error}</p>
                    ) : (
                        <div>
                            <h3>✅ Upload Successful!</h3>
                            <p><strong>Report ID:</strong> {uploadResponse._id}</p>
                            <p><strong>Crack Points:</strong> {uploadResponse.crack_points}</p>
                            <p><strong>Crack Type:</strong> {uploadResponse.crack_type}</p>
                            <p><strong>GPS Location:</strong> {uploadResponse.location}</p>
                            <p><strong>Status:</strong> {uploadResponse.status}</p>
                            <img 
                                src={`http://127.0.0.1:5000/uploads/${uploadResponse.filename}`} 
                                alt="Uploaded road damage"
                                style={{ width: "300px", marginTop: "10px" }} 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadForm;
