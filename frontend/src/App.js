import React, { useState } from 'react';

function App() {
  const [resume, setResume] = useState('');
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
      <h1>AI Resume Customizer</h1>
      <textarea placeholder="Paste your resume here" value={resume} onChange={e => setResume(e.target.value)} />
      <textarea placeholder="Paste job description here" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
      <button onClick={handleSubmit}>Customize Resume</button>
      <h2>Customized Resume:</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
