import React from 'react';

export default function ExtractionConsole({ extractionData }) {
  // Mock data placeholder 
  const data = extractionData || {
    document_type: "Official University Transcript",
    confidence_score: 0.984,
    extracted_metadata: {
      "student_name": "Aymane Aligner",
      "major": "Computer Science",
      "gpa": "3.87",
      "graduation_year": "2026",
      "detected_clauses": "Academic Integrity Clause, Dean Signature Requirement"
    }
  };

  return (
    <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 shadow-sm max-w-3xl mx-auto mt-12 overflow-hidden relative">
      {/* Top Banner accent matching AUI theme */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1D40] via-[#A39A8B] to-[#0D9488]"></div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#A39A8B]">AI Analysis Output</span>
          <h3 className="font-serif font-bold text-xl text-[#3E2723] mt-0.5">{data.document_type}</h3>
        </div>
        
        {/* Metric Gauge */}
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-[#0D9488]">{(data.confidence_score * 100).toFixed(1)}%</div>
          <div className="text-[10px] uppercase tracking-widest font-semibold text-[#A39A8B]">NLP Certainty Score</div>
        </div>
      </div>

      {/* Extracted Key-Value Grid */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data.extracted_metadata).map(([key, value]) => (
          <div key={key} className="p-4 rounded-2xl bg-[#F7F4EF]/50 border border-[#EBE6DD]/60 hover:bg-[#F7F4EF] transition-colors duration-200">
            <span className="text-[11px] font-semibold text-[#A39A8B] uppercase tracking-wider block mb-1">
              {key.replace('_', ' ')}
            </span>
            <span className="text-sm font-bold text-[#3E2723]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
