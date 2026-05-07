'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CollegeDetail() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${id}`, { cache: 'no-store' });
        const data = await res.json();
        setCollege(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
        <p className="text-cyan-400 font-bold tracking-widest animate-pulse">ANALYZING PROFILE...</p>
      </div>
    </div>
  );

  if (!college) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">College Not Found</div>;

  return (
    <main className="min-h-screen bg-gray-950 text-slate-200 selection:bg-cyan-500/30 font-sans pb-20">
      
      {/* --- Dynamic Hero Header --- */}
      <div className="relative h-[40vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 pb-12 relative z-10">
          <button 
            onClick={() => router.back()} 
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all font-bold group text-xs tracking-widest"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO DIRECTORY
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">Verified Institution</span>
                <span className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">ID: {id?.toString().slice(-6)}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
                {college.name}
              </h1>
              <p className="text-xl text-gray-400 font-medium flex items-center gap-2">
                <span className="text-fuchsia-500 text-2xl">📍</span> {college.location}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Global Rating</p>
                <div className="flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(college.rating) ? "text-yellow-400 text-xl" : "text-gray-700 text-xl"}>★</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl text-center min-w-[100px]">
                <p className="text-3xl font-black text-white">{college.rating}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-6 relative z-20">
        
        {/* Left Side: Critical Admission Data */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">#</span>
              Admission Rank Thresholds
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
              <div className="space-y-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Opening Rank (Min)</p>
                <p className="text-5xl font-black text-white tracking-tighter">{college.minRank?.toLocaleString()}</p>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 w-[30%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Closing Rank (Max)</p>
                <p className="text-5xl font-black text-fuchsia-500 tracking-tighter">{college.maxRank?.toLocaleString()}</p>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-fuchsia-500 w-[85%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-sm text-indigo-300 leading-relaxed">
              <strong>Admission Insight:</strong> Historical data indicates that candidates securing a rank between <strong>{college.minRank}</strong> and <strong>{college.maxRank}</strong> have the highest probability of enrollment.
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-[2.5rem] p-8 md:p-10">
            <h3 className="text-xl font-bold text-white mb-6">Institution Overview</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              {college.description}
            </p>
          </div>
        </div>

        {/* Right Side: Quick Specs & Courses */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Financial Summary */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-[2.5rem] p-8 shadow-xl">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Investment Details</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-bold">Estimated Annual Fees</p>
              <p className="text-4xl font-black text-white tracking-tighter">₹{college.fees?.toLocaleString()}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700/50 flex justify-between items-center text-xs">
               <span className="text-gray-500 font-bold uppercase">Frequency</span>
               <span className="text-white font-black">Per Academic Year</span>
            </div>
          </div>

          {/* Course Inventory */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-[2.5rem] p-8">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex justify-between items-center">
              Specializations
              <span className="px-2 py-1 bg-gray-800 rounded text-cyan-400 text-[10px]">{college.courses?.length} Programs</span>
            </h3>
            <div className="flex flex-col gap-3">
              {college.courses?.map((course: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-950/50 rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all cursor-default">
                  <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm font-bold text-gray-300">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Predictor Shortcut Card */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 text-center">
             <h4 className="font-bold text-white mb-2 italic">Analyze Your Rank</h4>
             <p className="text-gray-500 text-xs mb-6">Compare your rank against other elite institutions in our database.</p>
             <Link href="/" className="inline-block w-full py-4 bg-gray-900 text-cyan-400 border border-gray-800 font-black rounded-2xl hover:bg-gray-800 transition-all uppercase text-[10px] tracking-[0.2em]">
               Open Rank Predictor
             </Link>
          </div>

        </div>
      </div>
    </main>
  );
}