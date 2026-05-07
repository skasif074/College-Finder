"use client";

import { useState } from "react";
import Link from "next/link";

export default function RankPredictor() {
  const [rank, setRank] = useState("");
  const [predictedColleges, setPredictedColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rank: parseInt(rank) }),
      });
      
      const data = await response.json();
      setPredictedColleges(data);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-800 overflow-hidden transition-all">
      <div className="bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2 drop-shadow-md">
            <svg className="w-6 h-6 text-yellow-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Smart Rank Predictor
          </h2>
          <p className="text-gray-100 text-sm max-w-xl drop-shadow-sm font-medium">
            Enter your estimated rank and our algorithm will instantly match you with colleges where you meet the historical cutoff criteria.
          </p>
        </div>
      </div>
      
      <div className="p-8">
        <form onSubmit={handlePredict} className="flex flex-col sm:flex-row gap-4 mb-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-fuchsia-500 font-bold">#</span>
            </div>
            <input
              type="number"
              placeholder="e.g. 2500"
              value={rank}
              onChange={(e) => {
                setRank(e.target.value);
                // 🚀 This clears the results if the input is empty!
                if (e.target.value === "") {
                  setPredictedColleges([]);
                  setHasSearched(false);
                }
              }}
              className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-700 bg-gray-950/50 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 text-white text-lg font-semibold transition-all outline-none placeholder-gray-600 shadow-inner"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-fuchsia-600 text-white font-bold rounded-xl hover:bg-fuchsia-500 disabled:opacity-70 transition-all shadow-[0_0_15px_rgba(192,38,211,0.4)] hover:shadow-[0_0_25px_rgba(192,38,211,0.6)] flex items-center justify-center min-w-[160px]"
          >
            {loading ? "Analyzing..." : "Find Matches"}
          </button>
        </form>

        {hasSearched && !loading && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
              <h3 className="font-bold text-gray-300">
                Found <span className="text-cyan-400">{predictedColleges.length}</span> colleges in your range
              </h3>
            </div>
            
            {predictedColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {predictedColleges.map((college) => (
                  <div key={college.id} className="group p-4 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-cyan-500/50 hover:bg-gray-800 transition-all flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-200 block mb-1 group-hover:text-white transition-colors">{college.name}</span> 
                      <span className="text-xs font-semibold px-2 py-1 bg-cyan-950 text-cyan-400 rounded-md border border-cyan-800/50">
                        Cutoff: {college.maxRank}
                      </span>
                    </div>
                    <Link href={`/college/${college.id}`} className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-950/50 border border-gray-800 rounded-2xl text-center">
                <span className="text-3xl block mb-2">🤔</span>
                <p className="text-gray-300 font-medium">No matches found for this rank.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}