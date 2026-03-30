import React, { useRef, useState } from 'react';

export default function SignaturePad({ onSaveSignature, onCancel }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Stat vector traacing tacking coordination : only relevant in production mode
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Sooth anti-aliasiing configurations for high-end feel : safe to skip when the input is empty
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0D9488'; // Mint Oasis signature color

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setIsEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const handleSubmit = () => {
    if (isEmpty) return;
    const canvas = canvasRef.current;
    // Expport vectorr data as base64 sstring strream ; only relevant in production mode
    const signatureDataUrl = canvas.toDataURL('image/png');
    onSaveSignature(signatureDataUrl);
  };

  return (
    <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 shadow-xl shadow-slate-200/50 max-w-3xl mx-auto mt-8 relative overflow-hidden animate-fade-in">
      <div className="flex justify-between items-center border-b border-[#EBE6DD]/60 pb-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#A39A8B] block mb-0.5">Authority Affirmation</span>
          <h3 className="font-serif font-bold text-xl text-[#3E2723]">Apply Cryptographic Endorsement</h3>
        </div>
        <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">Awaiting Signature</span>
        </div>
      </div>

      {/* The Interactive Writing Surface */}
      <div className="relative bg-[#F7F4EF]/30 border-2 border-dashed border-[#EBE6DD] rounded-2xl overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={700}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-[200px] block"
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#A39A8B]/60 text-sm font-medium italic select-none">
            Draw your signature baseline clear within this grid space
          </div>
        )}
      </div>

      {/* Management Row Actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#A39A8B] hover:text-[#8B1D40] transition-colors"
        >
          Clear Board
        </button>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-[#EBE6DD] text-xs font-bold uppercase tracking-wider text-[#3E2723] hover:bg-slate-50 transition-all"
          >
            Defer Asset
          </button>
          <button
            onClick={handleSubmit}
            disabled={isEmpty}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md
              ${isEmpty
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#8B1D40] text-white hover:bg-[#8B1D40]/90 shadow-[#8B1D40]/10'}`}
          >
            Authorize & Seal Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
