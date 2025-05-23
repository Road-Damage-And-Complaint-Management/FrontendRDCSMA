import React, { useState, useRef } from "react";
import "../styles/UserDashboard.css";

const UserDashboard = ({ navigateToStatus }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [askUserName, setAskUserName] = useState(false);
    const [tempUploadTriggered, setTempUploadTriggered] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const startCamera = async () => {
        try {
            setCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraActive(false);
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 300, 200);

        canvasRef.current.toBlob((blob) => {
            setSelectedFile(new File([blob], "captured_image.jpg", { type: "image/jpeg" }));
            setCameraActive(false);

            if (videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }, "image/jpeg");
    };

   const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) return alert("Please select an image first!");

    if (uploadCount >= 0 && !sessionStorage.getItem("username")) {
        setAskUserName(true);
        setTempUploadTriggered(true);
        return;
    }

    setUploadCount(prev => prev + 1);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const username = sessionStorage.getItem("username") || "anonymous";
    formData.append("user_email", username);  // ✅ Add username to formData

    try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Upload successful:", result);
            setUploadResponse(result.data);
        } else {
            console.error("❌ Upload failed:", result.error);
            setUploadResponse({ error: result.error });
        }
    } catch (error) {
        console.error("❌ Network error:", error);
        setUploadResponse({ error: "Network error. Please try again." });
    }
};


    const handleNameSubmit = (e) => {
        e.preventDefault();
        const nameInput = e.target.elements.username.value.trim();
        if (!nameInput) return alert("Please enter a valid name.");
        sessionStorage.setItem("username", nameInput);
        setAskUserName(false);

        if (tempUploadTriggered) {
            setTempUploadTriggered(false);
            handleUpload(new Event("submit"));
        }
    };

    return (
        <div className="dashboard-container" style={{ border: "4px solid black" }}>
            <h2 className="dashboard-title">User Dashboard</h2>

            <div className="upload-options-row">
                <label className="file-upload">
                    📁 Upload from Device
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>

                <button className="camera-button" onClick={startCamera}>
                    📸 Capture from Camera
                </button>
            </div>

            {cameraActive && (
                <div className="camera-container">
                    <video ref={videoRef} autoPlay playsInline></video>
                    <button className="capture-button" onClick={capturePhoto}>Capture Photo</button>
                    <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }}></canvas>
                </div>
            )}

            <button className="upload-btn" onClick={handleUpload}>🚀 Upload Image</button>

            {askUserName && (
                <form onSubmit={handleNameSubmit} className="name-form">
                    <h3>Please enter your name:</h3>
                    <input type="text" name="username" placeholder="Your Name" required />
                    <button type="submit">Submit</button>
                </form>
            )}

            {uploadResponse && (
                <div className="upload-result">
                    {uploadResponse.error ? (
                        <p className="error">❌ {uploadResponse.error}</p>
                    ) : (
                        <div className="upload-success">
                            <h3>✅ Upload Successful!</h3>
                            <p><strong>Report ID:</strong> {uploadResponse._id}</p>
                            <p><strong>Crack Points:</strong> {uploadResponse.crack_points}</p>
                            <p><strong>Crack Type:</strong> {uploadResponse.crack_type}</p>
                            <p><strong>GPS Location:</strong> {uploadResponse.location}</p>
                            <p><strong>Latitude:</strong> {uploadResponse.gps_latitude}</p>
                            <p><strong>Longitude:</strong> {uploadResponse.gps_longitude}</p>
                            <p><strong>Depth Point:</strong> {uploadResponse.depth_points && uploadResponse.depth_points.length > 0 ? uploadResponse.depth_points[0] : "No depth points"}</p>
                            <p><strong>Status:</strong> {uploadResponse.status}</p>

                            <div className="image-preview">
                                <div className="image-container">
                                    <h4>Original Image:</h4>
                                    <img
                                        src={`http://127.0.0.1:5000/uploads/${uploadResponse.original_image}`}
                                        alt="Uploaded road damage"
                                        className="uploaded-image"
                                    />
                                </div>
                                <div className="image-container">
                                    <h4>Detected Damage:</h4>
                                    <img
                                        src={`http://127.0.0.1:5000/uploads/${uploadResponse.detected_image}`}
                                        alt="Detected road damage"
                                        className="uploaded-image"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

           

            <p className="status-instruction">
                📷 Upload an image from your device or capture one using your camera, then click 'Upload Image' to submit. 📄 Click 'View Application Status' to monitor the processing status of your submission.
            </p>
        </div>
    );
};

export default UserDashboard;
