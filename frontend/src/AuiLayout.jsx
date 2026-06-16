import React from 'react';

export default function AuiLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] font-sans antialiased text-[#3E2723] flex selection:bg-[#8B1D40] selection:text-white">
      {/* Structural Sidebar */}
      <aside className="w-80 bg-white border-r border-[#EBE6DD] flex flex-col justify-between p-8 relative overflow-hidden">
        {/* Subtle Moroccan Geometric Back-Pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#8B1D40_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
        
        <div className="z-10">
          {/* Logo Branding */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-xl bg-[#8B1D40] flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-[#8B1D40]/20">
              A
            </div>
            <div>
              <h1 className="font-serif font-bold tracking-tight text-lg text-[#8B1D40]">AUI Vault</h1>
              <p className="text-[11px] uppercase tracking-widest text-[#A39A8B] font-semibold">Secure Signing</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-4 px-4 py-3 rounded-xl bg-[#8B1D40]/5 text-[#8B1D40] font-medium transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#8B1D40]"></span>
              <span>Document Desk</span>
            </a>
            <a href="#" className="flex items-center space-x-4 px-4 py-3 rounded-xl text-[#A39A8B] hover:text-[#8B1D40] hover:bg-[#8B1D40]/5 font-medium transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#8B1D40]"></span>
              <span>Archive & Seals</span>
            </a>
          </nav>
        </div>

        {/* User Badge - Tethered to User 1 */}
        <div className="z-10 flex items-center space-x-4 p-3 bg-[#F7F4EF]/50 rounded-2xl border border-[#EBE6DD]">
          <div className="h-10 w-10 rounded-xl bg-[#3E2723] text-[#F7F4EF] flex items-center justify-center font-bold font-serif shadow-md">
            AA
          </div>
          <div>
            <h4 className="text-sm font-bold">Aymane Aligner</h4>
            <p className="text-xs text-[#A39A8B]">AUI Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace Canvas */}
      <main className="flex-1 p-12 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
