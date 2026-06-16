import React, { useState } from 'react';

export default function App() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [aiResult, setAiResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  // This function simulates the backend upload delay for testing our UI animations!
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    setUploadStatus('uploading');

    setTimeout(() => {
      setUploadStatus('success');
      setAiResult({
        document_type: "Official AUI Academic Transcript",
        confidence_score: 0.984,
        extracted_metadata: {
          "student_name": "Aymane Aligner",
          "major": "Computer Science",
          "gpa": "3.87",
          "graduation_year": "2026",
          "campus_origin": "Ifrane, Morocco",
          "detected_signatures": "Dean of School of Science & Engineering"
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-atlasLimestone font-sans text-cedarWood flex">
      
      {/* 🏛️ AUI Royal Sidebar Layout */}
      <aside className="w-80 bg-white border-r border-slate-200/80 flex flex-col justify-between p-8 relative overflow-hidden shadow-sm">
        <div className="z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-11 w-11 rounded-xl bg-auiCrimson flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-auiCrimson/20">
              A
            </div>
            <div>
              <h1 className="font-serif font-bold tracking-tight text-lg text-auiCrimson">AUI Vault</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Secure Signing</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left flex items-center space-x-4 px-4 py-3 rounded-xl bg-auiCrimson/5 text-auiCrimson font-semibold text-sm transition-all">
              <span className="w-2 h-2 rounded-full bg-auiCrimson"></span>
              <span>Document Desk</span>
            </button>
            <button className="w-full text-left flex items-center space-x-4 px-4 py-3 rounded-xl text-slate-400 hover:text-auiCrimson font-medium text-sm transition-all">
              <span className="w-2 h-2 rounded-full bg-transparent"></span>
              <span>Archive & Seals</span>
            </button>
          </nav>
        </div>

        {/* User Account Pin */}
        <div className="z-10 flex items-center space-x-4 p-3 bg-atlasLimestone/60 rounded-2xl border border-slate-200/60">
          <div className="h-10 w-10 rounded-xl bg-cedarWood text-atlasLimestone flex items-center justify-center font-bold font-serif shadow-sm">
            AA
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold">Aymane Aligner</h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">AUI Administrator</p>
          </div>
        </div>
      </aside>

      {/* 🌌 Workspace Center */}
      <main className="flex-1 p-12 max-w-5xl mx-auto flex flex-col justify-center">
        
        {/* 📥 Drag and Drop Canvas Zone */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-500 bg-white shadow-xl/10
            ${isDragActive 
              ? 'border-auiCrimson bg-auiCrimson/5 scale-[1.01] shadow-2xl shadow-auiCrimson/5' 
              : 'border-slate-200 hover:border-auiCrimson/40'}`}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500
              ${uploadStatus === 'uploading' ? 'animate-bounce bg-auiCrimson text-white' : 'bg-atlasLimestone text-auiCrimson'}`}
            >
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-cedarWood">Deposit Academic Asset</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto mt-1">
                {uploadStatus === 'uploading' ? 'Inhaling binary streams into ledger...' : 'Drag and drop your university document here.'}
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-auiCrimson/5 border border-auiCrimson/10 text-[11px] font-bold uppercase tracking-wider text-auiCrimson">
              🔒 Cryptographic Protection Active
            </div>
          </div>
        </div>

        {/* 🔮 Interactive AI Extraction Output Display */}
        {aiResult && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-100 mt-8 relative overflow-hidden transition-all duration-700 animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-auiCrimson via-slate-300 to-mintOasis"></div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">AI Neural Extraction Engine</span>
                <h3 className="font-serif font-bold text-xl text-cedarWood mt-0.5">{aiResult.document_type}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-mintOasis font-mono">{(aiResult.confidence_score * 100).toFixed(1)}%</div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 block">NLP Match Index</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(aiResult.extracted_metadata).map(([key, value]) => (
                <div key={key} className="p-4 rounded-xl bg-atlasLimestone/40 border border-slate-100 hover:bg-atlasLimestone/80 transition-colors">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {key.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-bold text-cedarWood">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
