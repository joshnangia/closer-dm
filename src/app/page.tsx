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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-500 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-400 opacity-10 rounded-full filter blur-2xl animate-pulse"></div>
      </div>
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-2 animate-fade-in">
          Close more deals in your DMs — <span className="text-indigo-600">instantly.</span>
        </h1>
        <p className="text-slate-600 text-center mb-6 animate-fade-in delay-100">
          Paste your convo and let our AI craft the perfect closing message.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-fade-in delay-200">
          <textarea
            className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg resize-vertical min-h-[120px] transition"
            placeholder="Paste your DM conversation here..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            rows={6}
          />
          <button
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Response'
            )}
          </button>
        </form>
        {output && (
          <div className="w-full mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner animate-fade-in">
            <div className="font-semibold text-slate-700 mb-2">AI Reply:</div>
            <div className="text-slate-900 whitespace-pre-line">{output}</div>
          </div>
        )}
      </div>
      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </main>
  );
}
