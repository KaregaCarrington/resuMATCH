import React, { useState } from "react";
import axios from "axios";
import '../App.css';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [customizedResume, setCustomizedResume] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('resume_file', file);
        formData.append('job_description', jobDescription);

        try {
        const res = await axios.post("http://localhost:5000/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        setCustomizedResume(res.data.customized_resume);
        } catch (error) {
        console.error("Error uploading file:", error);
        alert("There was an error processing your. Please try again.");
        }
  };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
                /><br/>
            <textarea
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                /><br/>
            <button type="submit">Customize Resume</button>

            <pre>
            {customizedResume && (
                <div>
                    <h2>Customized Resume</h2>
                    <a href={URL.createObjectURL(new Blob([customizedResume]))} download="customized_resume.pdf">
                        Download Customized Resume
                    </a>
                </div>
            )}
            </pre>
        </form>
    )
};
export default UploadForm;
