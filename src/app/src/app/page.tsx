'use client';

import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/closer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="container">
      <h1>Close more deals in your DMs — instantly.</h1>
      <p className="subtext">
        Paste your convo and let our AI craft the perfect closing message.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="textarea"
          placeholder="Paste your DM conversation here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
          rows={8}
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Response'}
        </button>
      </form>
      {loading && <div className="loading">Thinking...</div>}
      {output && (
        <div className="result-box">
          <strong>AI Reply:</strong>
          <p>{output}</p>
        </div>
      )}
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          padding: 2rem;
          background: #f8fafc;
        }
        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .subtext {
          color: #555;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .form {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .textarea {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          resize: vertical;
        }
        .button {
          padding: 1rem;
          font-size: 1.1rem;
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }
        .button:disabled {
          background: #6b7280;
          cursor: not-allowed;
        }
        .loading {
          margin-top: 1.5rem;
          color: #2563eb;
          font-weight: 500;
        }
        .result-box {
          margin-top: 2rem;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          padding: 1.5rem;
          max-width: 500px;
          width: 100%;
          word-break: break-word;
        }
        @media (max-width: 600px) {
          .container {
            padding: 1rem;
          }
          .form, .result-box {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
