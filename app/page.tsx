'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RankPredictor from '../app/components/RankPredictor';


export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // 🚀 The New Bulletproof Fetch Logic
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/colleges?search=${encodeURIComponent(search)}`, {
          cache: 'no-store', // Forces Next.js to ignore frontend cache
          headers: { 'Pragma': 'no-cache' }
        });
        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // The Debounce: Waits 300ms after you stop typing to search
    const timeoutId = setTimeout(() => {
      fetchColleges();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden selection:bg-fuchsia-500/30 selection:text-fuchsia-200 font-sans text-slate-200">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[140px] opacity-30 z-0 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[140px] opacity-20 z-0"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-indigo-600 rounded-full mix-blend-screen filter blur-[140px] opacity-20 z-0 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-700/50 shadow-lg backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Live Database 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 mb-6 tracking-tight drop-shadow-lg">
            Find Your Future.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium">
            Discover top-tier institutions, analyze real-time admission cutoffs, and pinpoint the perfect campus for your career.
          </p>
        </div>

        {/* Predictor Component */}
        <div className="max-w-4xl mx-auto mb-20 transform hover:-translate-y-1 transition-transform duration-500">
          <RankPredictor />
        </div>
        
        {/* Search Bar Section */}
        <div className="max-w-2xl mx-auto mb-16 relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by college name"
            className="w-full pl-14 pr-6 py-5 rounded-2xl border border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus:shadow-[0_0_30px_rgba(6,182,212,0.15)] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-gray-900/60 backdrop-blur-xl text-white text-lg transition-all outline-none placeholder-gray-500 font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-white">Explore Directory</h2>
          <span className="text-sm font-semibold text-gray-400 bg-gray-900/60 px-3 py-1 rounded-full border border-gray-800">{colleges.length} Results</span>
        </div>

        {/* Listing Grid (With min-height to fix the jump bug) */}
        <div className="min-h-[600px]">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="w-12 h-12 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
              <p className="text-gray-400 font-medium animate-pulse">Searching...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.map((college: any) => (
                <div 
                  key={college.id} 
                  className="group relative bg-gray-900/40 backdrop-blur-lg rounded-3xl border border-gray-800 hover:border-fuchsia-500/50 p-1 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(192,38,211,0.15)] hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="h-32 w-full rounded-t-[22px] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
                     <div className="absolute inset-0 bg-black/20"></div>
                     <div className="absolute bottom-4 left-4 bg-gray-950/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white font-bold text-sm flex items-center gap-1 shadow-sm">
                        <span className="text-yellow-400">★</span> {college.rating} / 5
                     </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {college.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 font-medium">
                      <svg className="h-4 w-4 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {college.location}
                    </div>
                    
                    <div className="mt-auto"></div>
                    
                    <div className="flex justify-between items-center pt-5 border-t border-gray-800">
                      <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Est. Fees</p>
                        <p className="text-cyan-400 font-extrabold text-lg drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                          ₹{college.fees?.toLocaleString() || "N/A"}
                          <span className="text-xs font-bold text-gray-500 ml-1">/yr</span>
                        </p>
                      </div>
                      
                      <Link 
                        href={`/college/${college.id}`}
                        className="px-5 py-2.5 bg-gray-800 text-white hover:bg-cyan-500 hover:text-gray-950 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {colleges.length === 0 && !loading && (
            <div className="text-center py-24 bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-800 shadow-sm max-w-2xl mx-auto mt-8">
              <span className="text-4xl block mb-4">🔍</span>
              <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
              <p className="text-gray-400 font-medium">We couldn't find any institutions matching "{search}".</p>
              <button onClick={() => setSearch('')} className="mt-6 text-cyan-400 font-bold hover:text-cyan-300 underline decoration-2 underline-offset-4">
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}