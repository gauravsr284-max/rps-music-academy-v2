const { useState } = React;

export default function App() {
  const [role, setRole] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [pass, setPass] = useState('');
  const [approved, setApproved] = useState(false);
  const [inCall, setInCall] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4">
      <header className="bg-gray-800 p-3 rounded mb-4 flex justify-between items-center flex-wrap gap-2 shadow">
        <h1 className="text-sm font-bold text-yellow-400">RPS Music Academy</h1>
        <div className="flex gap-1 text-xs">
          <button onClick={() => setRole('home')} className={`px-2 py-1 rounded ${role==='home'?'bg-yellow-500 text-gray-900 font-bold':'bg-gray-700'}`}>Home</button>
          <button onClick={() => setRole('student')} className={`px-2 py-1 rounded ${role==='student'?'bg-yellow-500 text-gray-900 font-bold':'bg-gray-700'}`}>Student</button>
          <button onClick={() => setRole('teacher')} className={`px-2 py-1 rounded ${role==='teacher'?'bg-yellow-500 text-gray-900 font-bold':'bg-gray-700'}`}>Teacher</button>
          <button onClick={() => setRole('admin')} className={`px-2 py-1 rounded ${role==='admin'?'bg-red-500 text-white font-bold':'bg-gray-700'}`}>Admin</button>
        </div>
      </header>

      <main className="max-w-md mx-auto space-y-4 text-xs">
        {role === 'home' && (
          <div className="bg-gray-800 p-4 rounded space-y-3">
            <h2 className="text-base font-bold text-yellow-400">Banaras Gharana Tabla & Music Center</h2>
            <p className="text-gray-300 text-[11px]">Professional training for Tabla, Guitar & Harmonium.</p>
            <a href="https://forms.gle/YOUR_GOOGLE_FORM" target="_blank" rel="noreferrer" className="block text-center bg-yellow-500 text-gray-900 font-bold p-2 rounded">
              Register via Google Form
            </a>
          </div>
        )}

        {role === 'student' && (
          <div className="bg-gray-800 p-4 rounded space-y-3">
            <h2 className="text-base font-bold text-yellow-400">Student Portal</h2>
            {!approved ? (
              <button onClick={() => alert('Request sent!')} className="w-full bg-yellow-500 text-gray-900 font-bold p-2 rounded">
                Request Admin to Connect Class
              </button>
            ) : !inCall ? (
              <button onClick={() => setInCall(true)} className="w-full bg-green-600 text-white font-bold p-2 rounded">
                Join Live Class
              </button>
            ) : (
              <div className="space-y-2">
                <iframe src="https://meet.jit.si/RPSMusicAcademyLive" className="w-full h-48 border-0 rounded" allow="camera;microphone;fullscreen"></iframe>
                <button onClick={() => setInCall(false)} className="w-full bg-red-600 font-bold p-1.5 rounded">Leave Class</button>
              </div>
            )}
          </div>
        )}

        {role === 'teacher' && (
          <div className="bg-gray-800 p-4 rounded space-y-3">
            <h2 className="text-base font-bold text-yellow-400">Teacher Dashboard</h2>
            <p className="text-gray-300">Policies: Referral (97%), Normal (60% Teacher / 40% Academy).</p>
          </div>
        )}

        {role === 'admin' && (
          <div className="bg-gray-800 p-4 rounded space-y-3 border border-red-500">
            <h2 className="text-base font-bold text-red-400">Admin Dashboard</h2>
            {!isAdmin ? (
              <div className="space-y-2">
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password (1234)" className="w-full bg-gray-700 p-2 rounded text-white" />
                <button onClick={() => { if(pass === '1234') setIsAdmin(true); else alert('Wrong password!'); }} className="w-full bg-red-600 font-bold p-2 rounded">Login</button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-green-300">✔ Admin Verified</p>
                <button onClick={() => { setApproved(true); alert('Class Connected!'); }} className="w-full bg-green-600 font-bold p-1.5 rounded">Approve & Connect Class</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
