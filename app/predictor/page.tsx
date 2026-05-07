'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Predictor() {
  const [rank, setRank] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    
    setLoading(true);
    setHasSearched(true);
    const res = await fetch(`/api/predict?rank=${rank}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center text-indigo-600 font-semibold mb-8 hover:text-indigo-800">
          &larr; Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="text-4xl block mb-4">🎯</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            College Predictor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your expected JEE Rank, and our AI-driven logic will predict the best institutions you can qualify for.
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-16">
          <form onSubmit={handlePredict} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Expected Rank</label>
              <input
                type="number"
                placeholder="e.g. 15000"
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-600 outline-none text-xl font-bold text-gray-900 transition-colors"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Predict Colleges
            </button>
          </form>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
            <p className="text-gray-500">We couldn't find colleges for this exact rank range.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Top {results.length} Matches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((college: any) => (
                <div key={college.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{college.name}</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Match</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">📍 {college.location}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Rank Required</p>
                    <p className="text-indigo-600 font-bold">{college.minRank.toLocaleString()} - {college.maxRank.toLocaleString()}</p>
                  </div>
                  
                  <Link href={`/college/${college.id}`} className="block text-center w-full bg-gray-50 text-indigo-600 font-bold py-3 rounded-xl border border-gray-200 hover:bg-indigo-600 hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}