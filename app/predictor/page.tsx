'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RankPredictor from '@/components/RankPredictor';

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Unified Fetch Function
  const loadData = async (query: string) => {
    setLoading(true);
    try {
      // We use a timestamp (t=...) to completely kill any browser caching
      const url = `/api/colleges?search=${encodeURIComponent(query)}&t=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();
      setColleges(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Trigger fetch on search change
  useEffect(() => {
    const handler = setTimeout(() => {
      loadData(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden text-slate-200">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600 rounded-full blur-[140px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600 rounded-full blur-[140px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-6">
            College Discovery
          </h1>
        </div>

        {/* Rank Predictor */}
        <div className="max-w-4xl mx-auto mb-20">
          <RankPredictor />
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <input
            type="text"
            value={search}
            placeholder="Type a city (e.g. Mumbai) or Name..."
            className="w-full px-6 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid Container with fixed min-height */}
        <div className="min-h-[500px]">
          {loading ? (
            <div className="text-center py-20 text-cyan-400 animate-pulse font-bold">Searching Database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {colleges.map((college: any) => (
                <div key={college.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-cyan-500 transition-all">
                  <h3 className="text-xl font-bold mb-2">{college.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">📍 {college.location}</p>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                    <span className="text-cyan-400 font-bold">₹{college.fees.toLocaleString()}</span>
                    <Link href={`/college/${college.id}`} className="text-xs bg-gray-800 px-4 py-2 rounded-lg">Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {colleges.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-500">No colleges found for "{search}"</div>
          )}
        </div>
      </div>
    </main>
  );
}