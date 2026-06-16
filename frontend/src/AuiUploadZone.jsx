import React, { useState } from 'react';

export default function AuiUploadZone({ onFileSelected }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      className={`relative group rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-500 max-w-3xl mx-auto bg-white/60 backdrop-blur-md shadow-sm
        ${isDragActive 
          ? 'border-[#8B1D40] bg-[#8B1D40]/5 scale-[1.01] shadow-xl shadow-[#8B1D40]/5' 
          : 'border-[#EBE6DD] hover:border-[#8B1D40]/40 hover:shadow-md'}`}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Animated Visual Target */}
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner
          ${isDragActive 
            ? 'bg-[#8B1D40] text-white rotate-90 scale-110' 
            : 'bg-[#F7F4EF] text-[#8B1D40] group-hover:scale-105 group-hover:bg-[#8B1D40]/5'}`}
        >
          {/* Custom SVG Icon representing document protection */}
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif font-bold text-2xl text-[#3E2723]">Deposit Academic Asset</h3>
          <p className="text-[#A39A8B] text-sm max-w-sm mx-auto">
            Drag and drop your document here, or click to securely browse your local system.
          </p>
        </div>

        {/* Decorative Traditional Label Pin */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#8B1D40]/5 border border-[#8B1D40]/10 text-xs font-semibold uppercase tracking-wider text-[#8B1D40]">
          🔒 Cryptographic Ingestion Active
        </div>
      </div>
    </div>
  );
}
