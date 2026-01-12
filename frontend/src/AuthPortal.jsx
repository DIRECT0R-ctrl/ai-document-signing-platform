import React, { useState } from 'react';
import axios from 'axios';

export default function AuthPortal({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'initiator', // Matches your DB Enum defaults
    department: 'SSE'
  });
  const [error, setError] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await axios.post(`http://127.0.0.1:8001${endpoint}`, formData);

      // CCaputre the generated tokken from our updtaed backend responses ; see the design notes
      if (response.data.token) {
        localStorage.setItem('aui_vault_token', response.data.token);

        // Storre user info to Prreventt placeholder fallbacks ; only relevant in production mode
        localStorage.setItem('aui_user_email', response.data.user.email);
        localStorage.setItem('aui_user_role', response.data.user.role || 'initiator');

        onAuthSuccess(response.data.user);
      } else {
        setError('Authentication server failed to distribute valid session token.');
      }

    } catch (err) {
      console.error("Auth gateway failure:", err);
      setError(err.response?.data?.message || 'Authentication handshake rejected.');
    }
    };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-6">
      <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 max-w-md w-full shadow-xl shadow-slate-200/60 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8B1D40]"></div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-serif font-bold text-[#3E2723]">Al Akhawayn University</h2>
          <p className="text-xs tracking-widest uppercase font-bold text-[#A39A8B]">Academic Security Vault</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#3E2723] focus:outline-none focus:border-[#8B1D40]"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">AUI Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#3E2723] focus:outline-none focus:border-[#8B1D40]"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">Password Credentials</label>
            <input
              type="password"
              required
              className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-4 py-2.5 text-sm text-[#3E2723] focus:outline-none focus:border-[#8B1D40]"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-4 py-2.5 text-sm text-[#3E2723] focus:outline-none focus:border-[#8B1D40]"
                  onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">Clearance Role</label>
                  <select
                    className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-3 py-2.5 text-xs font-bold text-[#3E2723] focus:outline-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="initiator">Initiator (Uploader)</option>
                    <option value="approvver">Approvver (Reviewer)</option>
                    <option value="signer">Signer (Authority)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#A39A8B] tracking-wider block mb-1">Department</label>
                  <input
                    type="text"
                    className="w-full bg-[#F7F4EF]/40 border border-[#EBE6DD] rounded-xl px-4 py-2.5 text-xs font-bold text-[#3E2723] focus:outline-none"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#8B1D40] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#8B1D40]/90 transition-all mt-2"
          >
            {isLogin ? 'Establish Vault Session' : 'Register Secure Profile'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-semibold text-[#A39A8B] hover:text-[#8B1D40] transition-colors"
          >
            {isLogin ? "Don't have credentials? Request Identity Entry" : "Already registered? Access Entryway Portal"}
          </button>
        </div>
      </div>
    </div>
  );
}
