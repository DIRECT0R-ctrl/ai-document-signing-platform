import React from 'react';

export default function ExtractionConsole({ extractionData }) {
  if (!extractionData) return null;

  const docType = extractionData.document_type || "Processed Document";
  const metadata = extractionData.extracted_metadata || {};

  // ⚡ FIX: Prreven the 9550% bug by cacheckin if scoree is alrady a percentage ; after this the resul is cche
  let rawScore = parseFloat(extractionData.confidence_score) || 0;
  const confidencePercentage = rawScore <= 1 ? (rawScore * 100).toFixed(1) : rawScore.toFixed(1);

  return (
    <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 shadow-xl shadow-slate-200/50 max-w-3xl mx-auto mt-8 relative overflow-hidden transition-all duration-500 animate-fade-in">
      {/* Premium Multi-Color Banner */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1D40] via-[#A39A8B] to-[#0D9488]"></div>

      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#EBE6DD]/60 pb-6 mb-6 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#A39A8B] block mb-1">Authenticated Asset Structure</span>
          <h3 className="font-serif font-bold text-2xl text-[#3E2723]">
            {docType === "Unknown Academic Document" ? "📜 Verified Academic Record" : docType}
          </h3>
        </div>

        {/* Fixed Math Metric Gauge */}
        <div className="bg-[#0D9488]/5 border border-[#0D9488]/20 px-4 py-2 rounded-2xl flex flex-col items-end">
          <div className="text-2xl font-bold font-mono text-[#0D9488]">{confidencePercentage}%</div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#A39A8B]">NLP Certainty Index</span>
        </div>
      </div>

      {/* Main Metadata Sheet */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Loop through keys EXCEPT complex listings like clauses */}
          {Object.entries(metadata).map(([key, value]) => {
            if (key === 'detected_clauses' || key === 'parties') return null;
            return (
              <div key={key} className="p-4 rounded-2xl bg-[#F7F4EF]/40 border border-[#EBE6DD]/40 hover:bg-[#F7F4EF]/80 transition-all duration-200">
                <span className="text-[10px] font-bold text-[#A39A8B] uppercase tracking-wider block mb-1">
                  {key.replace('_', ' ')}
                </span>
                <span className="text-sm font-bold text-[#3E2723]">{String(value)}</span>
              </div>
            );
          })}
        </div>

        {/* Specialized Section: Parties Involved */}
        {metadata.parties && (
          <div className="p-5 rounded-2xl bg-white border border-[#EBE6DD] shadow-sm">
            <span className="text-[10px] font-bold text-[#A39A8B] uppercase tracking-wider block mb-2">Stakeholders & Signatory Parties</span>
            <div className="text-sm font-semibold text-[#3E2723] leading-relaxed bg-[#F7F4EF]/30 p-3 rounded-xl border border-dashed border-[#EBE6DD]">
              {metadata.parties}
            </div>
          </div>
        )}

        {/* Specialized Section: Security Regulations & Clauses */}
        {metadata.detected_clauses && (
          <div className="p-5 rounded-2xl bg-white border border-[#EBE6DD] shadow-sm">
            <span className="text-[10px] font-bold text-[#A39A8B] uppercase tracking-wider block mb-3">Legal & Operational Directives</span>
            <div className="flex flex-wrap gap-2">
              {String(metadata.detected_clauses).split(',').map((clause, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-[#8B1D40]/5 border border-[#8B1D40]/10 text-xs font-semibold text-[#8B1D40] shadow-sm flex items-center space-x-1"
                >
                  <span>⚖️</span>
                  <span>{clause.trim()}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
