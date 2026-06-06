<!DOCTYPE html>
<html lang="en" class="h-full bg-[#090A0F]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AUI AI Document Vault</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-panel {
            background: rgba(17, 19, 28, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glow-green { shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
    </style>
</head>
<body class="h-full text-gray-200 antialiased">

    <div class="flex h-full">
        <aside class="w-64 bg-[#0B0D14] border-r border-gray-900 flex flex-col justify-between p-6">
            <div>
                <div class="flex items-center gap-3 px-2 py-4">
                    <div class="h-9 w-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20">
                        AUI
                    </div>
                    <div>
                        <h1 class="text-sm font-bold tracking-wide uppercase text-white">DocSign AI</h1>
                        <span class="text-xs text-gray-500 font-medium">Secured by Cryptography</span>
                    </div>
                </div>

                <nav class="mt-8 space-y-1.5">
                    <a href="#" class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 rounded-r-xl text-emerald-400 text-sm font-medium transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>
                        Dashboard Cockpit
                    </a>
                    <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        My Documents
                    </a>
                    <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                        Pending Actions
                    </a>
                </nav>
            </div>

            <div class="glass-panel p-4 rounded-2xl flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-gray-300">
                    AD
                </div>
                <div class="overflow-hidden">
                    <h4 class="text-xs font-semibold text-white truncate">Dr. Ahmed Dean</h4>
                    <span class="text-[10px] text-gray-400 tracking-wider block uppercase">School of Science (SSE)</span>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto p-10 space-y-8">
            
            <header class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-white tracking-tight">System Terminal</h2>
                    <p class="text-sm text-gray-400">Manage, analyze, and sign active university workflows.</p>
                </div>
                <div class="flex gap-3">
                    <button class="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-all">Verify Outer PDF</button>
                    <button class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all cursor-pointer">
                        + New Document
                    </button>
                </div>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div class="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 text-emerald-400"><svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.522L3.547 11H7a.75.75 0 01.75.75v3.693l3.522-4.93a.75.75 0 00-.513-1.113H7.5a.75.75 0 01-.749-.854l.516-2.932z" clip-rule="evenodd"></path></svg></div>
                    <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">AI Accuracy Rating</span>
                    <h3 class="text-3xl font-bold text-white mt-2">98.4%</h3>
                    <p class="text-xs text-emerald-400 mt-1">↑ 0.2% over last 30 days</p>
                </div>
                <div class="glass-panel p-6 rounded-2xl">
                    <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">Awaiting My Signature</span>
                    <h3 class="text-3xl font-bold text-amber-400 mt-2">04</h3>
                    <p class="text-xs text-gray-500 mt-1">Requires biometric hash confirm</p>
                </div>
                <div class="glass-panel p-6 rounded-2xl">
                    <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">Completed Matrix</span>
                    <h3 class="text-3xl font-bold text-white mt-2">142</h3>
                    <p class="text-xs text-gray-500 mt-1">Immutable records secured</p>
                </div>
                <div class="glass-panel p-6 rounded-2xl">
                    <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">Active System Load</span>
                    <h3 class="text-3xl font-bold text-teal-400 mt-2">Optimal</h3>
                    <p class="text-xs text-teal-500/80 mt-1">● AI Engine connected</p>
                </div>
            </div>

            <section class="glass-panel rounded-3xl p-8 border-dashed border-2 border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.02] to-transparent text-center group hover:border-emerald-500/40 transition-all cursor-pointer">
                <div class="max-w-md mx-auto py-6 flex flex-col items-center">
                    <div class="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    </div>
                    <h3 class="text-base font-semibold text-white">Upload document to initiate AI pipeline</h3>
                    <p class="text-xs text-gray-400 mt-1.5 max-w-xs">Drop Capstone contracts, transcripts, or MOU PDFs here. Max 25MB.</p>
                </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div class="lg:col-span-2 glass-panel rounded-2xl overflow-hidden">
                    <div class="p-6 border-b border-gray-900 flex justify-between items-center">
                        <h3 class="font-bold text-white text-sm uppercase tracking-wider">Live Document Ledger</h3>
                        <span class="text-xs text-gray-400">Sorted by dynamic interaction</span>
                    </div>
                    <div class="divide-y divide-gray-900/60">
                        
                        <div class="p-5 flex justify-between items-center hover:bg-white/[0.01] transition-all">
                            <div class="flex items-center gap-4">
                                <div class="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/10">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-white">MOU_OCP_Renewals_2026.pdf</h4>
                                    <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                        <span class="text-emerald-400 font-medium">Memorandum</span>
                                        <span>•</span>
                                        <span>Hash: 8a4c...f21d</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/10">
                                    Pending Dean Sign
                                </span>
                                <span class="block text-[10px] text-gray-500 mt-1">Step 2 of 3</span>
                            </div>
                        </div>

                        <div class="p-5 flex justify-between items-center hover:bg-white/[0.01] transition-all">
                            <div class="flex items-center gap-4">
                                <div class="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/10">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-white">SBA_Internship_KPMG_Signed.pdf</h4>
                                    <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                        <span class="text-teal-400 font-medium">Internship Agreement</span>
                                        <span>•</span>
                                        <span>Hash: e3b0...c442</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                                    Sealed & Valid
                                </span>
                                <span class="block text-[10px] text-gray-500 mt-1">Archived Successfully</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between border-b border-gray-900 pb-4 mb-4">
                            <h3 class="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                AI Live Insights
                            </h3>
                            <span class="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-mono">NLP Engine v2</span>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                <span class="text-[10px] text-gray-500 uppercase font-semibold">Active Document Analysis</span>
                                <h5 class="text-xs font-bold text-white mt-0.5">MOU_OCP_Renewals_2026.pdf</h5>
                            </div>

                            <div class="space-y-2.5">
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-400">Identified Type:</span>
                                    <span class="text-white font-medium">Corporate Partnership Contract</span>
                                </div>
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-400">Extracted Parties:</span>
                                    <span class="text-white font-medium truncate max-w-[150px]">AUI (SBA), OCP Group</span>
                                </div>
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-400">Critical Clauses Found:</span>
                                    <span class="text-amber-400 font-semibold">02 Liability Shifts</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-gray-900 mt-6">
                        <div class="flex justify-between items-center text-xs text-gray-400 mb-2">
                            <span>Processing Speed</span>
                            <span class="font-mono text-emerald-400">1.2s / doc</span>
                        </div>
                        <div class="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                            <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full" style="width: 85%"></div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </div>

</body>
</html>
