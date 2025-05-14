import React, { useState } from 'react';
import './App.css';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/customize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resume, job_description: jobDescription })
    });
    const data = await res.json();
    setResult(data.customized_resume);
  };

  return (
    <div>
      
      <div className='input-container'>
        <h1>AI Resume Customizer</h1>
        <label className='upload-label'>
          Upload your resume:
          <input type='file' className="text-area" accept=".pdf,.doc,.docx,.txt" value={resume} onChange={e => setResume(e.target.value)} />
        </label>
        <textarea className='text-area' placeholder="Paste job description here" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
        <button onClick={handleSubmit}>Customize Resume</button>
      </div>
      
      <pre>{result}</pre>
      {result && (
        <div className='download-container'>
          <a href={URL.createObjectURL(new Blob([result], { type: 'text/plain' }))} download="customized_resume.txt">
            Download Customized Resume
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
