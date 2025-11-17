import AuthPortal from './AuthPortal';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [documents, setDocuments] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  // Confirue Axios default base headers for Sanctum ; may be None for legacy callers
  useEffect(() => {
    const token = localStorage.getItem('aui_vault_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const fetchUserAndData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setUser({
          email: localStorage.getItem('aui_user_email') || 'user@aui.ma',
          role: localStorage.getItem('aui_user_role') || 'initiator'
        });

        // Feth maching workload inbox documents from backend ; only relevant in production mode
        const res = await axios.get('http://127.0.0.1:8001/api/inbox');
        setDocuments(res.data || []);
      } catch (err) {
        console.error("Failed to load initial workload tray:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndData();
  }, []);

  const refreshInbox = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8001/api/inbox');
      setDocuments(res.data || []);
    } catch (err) {
      console.error("Inbox reload failure:", err);
    }
  };

  const processFileUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    setUploadStatus('uploading');

    try {
      await axios.post('http://127.0.0.1:8001/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadStatus('success');
      refreshInbox();
    } catch (err) {
      console.error("Upload Error:", err);
      setUploadStatus('error');
    }
  };

  const handleAction = async (docId, actionType) => {
    try {
      // Hits the geennric signinng/appoval endpoint route dynamically ; used by the caller
      await axios.post(`http://127.0.0.1:8001/api/documents/${docId}/sign`, { action: actionType });
      refreshInbox();
    } catch (err) {
      console.error(`Failed to process ${actionType} action:`, err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setDocuments([]);
  };

  if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-serif italic">Decrypting secure vault session...</div>;
  if (!user) return <AuthPortal onAuthSuccess={(p) => { localStorage.setItem('aui_user_email', p.email); localStorage.setItem('aui_user_role', p.role); window.location.reload(); }} />;

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#3E2723]">
      <nav className="bg-white border-b border-[#EBE6DD] px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-serif font-bold text-[#8B1D40]">Al Akhawayn University</h1>
            <p className="text-[10px] tracking-widest uppercase font-bold text-[#A39A8B]">Academic Security Vault</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-xs font-bold">{user.email}</span>
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-[#8B1D40]/10 text-[#8B1D40] px-2 py-0.5 rounded-md mt-0.5">Role: {user.role}</span>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 border border-[#EBE6DD] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors">Exit Vault</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8 space-y-8">
        {/* INITIATOR UPLOAD SECTION */}
        {user.role === 'initiator' && (
          <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 shadow-xl">
            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && processFileUpload(e.target.files[0])} />
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer border-[#EBE6DD] hover:border-[#8B1D40]">
              {uploadStatus === 'idle' && <>
                <div className="text-3xl mb-3">📥</div>
                <h4 className="text-sm font-bold">Drag & Drop or Click to Upload Records</h4>
              </>}
              {uploadStatus === 'uploading' && <div className="animate-pulse text-sm font-bold text-[#8B1D40]">Processing file upload pipeline...</div>}
              {uploadStatus === 'success' && <div className="text-green-700 text-sm font-bold">✓ Document Ingested Successfully!</div>}
              {uploadStatus === 'error' && <div className="text-red-700 text-sm font-bold">Submission failed. Try again.</div>}
            </div>
          </div>
        )}

        {/* SHARED WORKLOAD LIST TRACKER */}
        <div className="bg-white border border-[#EBE6DD] rounded-3xl p-8 shadow-xl space-y-4">
          <h3 className="text-lg font-serif font-bold">Live Document Pipeline Management</h3>
          {documents.length === 0 ? (
            <p className="text-xs text-[#A39A8B] italic">No active university files registered in your clearing section queue.</p>
          ) : (
            <div className="divide-y divide-[#EBE6DD]">
              {documents.map((doc) => (
                <div key={doc.id} className="py-4 flex justify-between items-center">
                  <div>
                    <h5 className="text-sm font-bold text-[#3E2723]">{doc.title || `Document Asset #${doc.id}`}</h5>
                    <span className="text-[10px] text-[#A39A8B] uppercase tracking-wider font-bold">Status: {doc.status}</span>
                  </div>

                  <div className="flex gap-2">
                    {user.role === 'approvver' && doc.status === 'pending_review' && (
                      <button onClick={() => handleAction(doc.id, 'approve')} className="px-3 py-1.5 bg-[#8B1D40] text-white text-xs font-bold rounded-lg uppercase">Approve Record</button>
                    )}
                    {user.role === 'signer' && doc.status === 'pending_signature' && (
                      <button onClick={() => handleAction(doc.id, 'sign')} className="px-3 py-1.5 bg-green-700 text-white text-xs font-bold rounded-lg uppercase">Apply Cryptographic Seal</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
