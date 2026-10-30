function App() {
  const [role, setRole] = React.useState('home');
  const [updates, setUpdates] = React.useState([{ id: 1, text: "Welcome to RPS Music Talim Academy!" }]);
  const [noticeText, setNoticeText] = React.useState('');
  const [adminPass, setAdminPass] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  // Meeting & Class states
  const [platform, setPlatform] = React.useState('jitsi');
  const [meetLink, setMeetLink] = React.useState('RPSMusicAcademyLive');
  const [approved, setApproved] = React.useState(false);
  const [inCall, setInCall] = React.useState(false);

  // Messages & Recording
  const [studentMsgs, setStudentMsgs] = React.useState([]);
  const [studentText, setStudentText] = React.useState('');
  const [teacherMsgs, setTeacherMsgs] = React.useState([{ id: 1, text: "Welcome students to class!" }]);
  const [teacherText, setTeacherText] = React.useState('');
  const [recLink, setRecLink] = React.useState('');
  const [recs, setRecs] = React.useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pb-10">
      {/* Notification Banner */}
      <div className="bg-yellow-500 text-gray-900 py-2 px-4 text-center font-bold text-xs">
        <marquee>{updates.map(u => u.text).join(" || ")}</marquee>
      </div>

      {/* Header & Nav */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 className="text-base font-bold text-yellow-400">RPS Music Talim Academy</h1>
          <p className="text-[10px] text-gray-400">Admin: Gaurav Srivastava</p>
        </div>
        <div className="flex gap-1 flex-wrap text-xs">
          <button onClick={() => setRole('home')} className={`px-2.5 py-1 rounded ${role === 'home' ? 'bg-yellow-500 text-gray-900 font-bold' : 'bg-gray-700'}`}>Home</button>
          <button onClick={() => setRole('student')} className={`px-2.5 py-1 rounded ${role === 'student' ? 'bg-yellow-500 text-gray-900 font-bold' : 'bg-gray-700'}`}>Student</button>
          <button onClick={() => setRole('teacher')} className={`px-2.5 py-1 rounded ${role === 'teacher' ? 'bg-yellow-500 text-gray-900 font-bold' : 'bg-gray-700'}`}>Teacher</button>
          <button onClick={() => setRole('admin')} className={`px-2.5 py-1 rounded ${role === 'admin' ? 'bg-red-500 text-white font-bold' : 'bg-gray-700'}`}>Admin</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        
        {/* HOME */}
        {role === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 text-center shadow-lg space-y-3">
              <h2 className="text-2xl font-bold">Banaras Gharana Tabla & Music Center</h2>
              <p className="text-xs opacity-90">Professional online & offline classes for Tabla, Guitar, Harmonium & Sitar.</p>
              <a href="https://forms.gle/YOUR_GOOGLE_FORM" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold text-xs inline-block shadow">
                Register via Google Form
              </a>
            </div>

            {/* Fee Structure */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
              <h3 className="text-sm font-bold text-yellow-400 border-b border-gray-700 pb-2">Fee Structure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-gray-700 p-3 rounded">
                  <p className="font-bold text-yellow-300">Basic Monthly</p>
                  <p className="text-lg font-extrabold mt-1">₹1,500</p>
                </div>
                <div className="bg-gray-700 p-3 rounded border border-yellow-500">
                  <p className="font-bold text-yellow-300">Solo Tabla Special</p>
                  <p className="text-lg font-extrabold mt-1">₹2,500</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <p className="font-bold text-yellow-300">Online 1-on-1</p>
                  <p className="text-lg font-extrabold mt-1">₹3,000</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT PORTAL */}
        {role === 'student' && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-4 text-xs">
            <h2 className="text-lg font-bold text-yellow-400">Student Portal</h2>

            {/* Teacher Announcements */}
            <div className="bg-gray-700 p-3 rounded space-y-2">
              <p className="font-bold text-yellow-300">Teacher Announcements:</p>
              {teacherMsgs.map(m => (
                <div key={m.id} className="bg-gray-800 p-2 rounded text-gray-200">📢 {m.text}</div>
              ))}
            </div>

            {/* Live Class */}
            <div className="bg-gray-700 p-3 rounded space-y-3">
              <p className="font-bold text-yellow-300">Live Video Class</p>
              {!approved ? (
                <button onClick={() => alert('Join request sent to Admin!')} className="bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded">
                  Request Admin to Connect Class
                </button>
              ) : !inCall ? (
                <button onClick={() => setInCall(true)} className="bg-green-600 text-white font-bold px-4 py-2 rounded">
                  Join Approved Class ({platform.toUpperCase()})
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="h-80 bg-black rounded overflow-hidden">
                    {platform === 'jitsi' ? (
                      <iframe src={`https://meet.jit.si/${meetLink}`} style={{width:'100%', height:'100%', border:0}} allow="camera;microphone;fullscreen"></iframe>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-2">
                        <p className="text-yellow-400">Google Meet Link:</p>
                        <a href={`https://${meetLink}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Open Google Meet</a>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setInCall(false)} className="bg-red-600 text-white font-bold px-3 py-1.5 rounded">Leave</button>
                </div>
              )}
            </div>

            {/* Private Message to Admin */}
            <div className="bg-gray-700 p-3 rounded space-y-2">
              <p className="font-bold text-yellow-300">Private Message to Admin (Gaurav Srivastava):</p>
              <textarea 
                rows="2" 
                value={studentText} 
                onChange={(e) => setStudentText(e.target.value)} 
                placeholder="Yahan apni baat likhein jo sirf admin dekhega..."
                className="w-full bg-gray-800 p-2 rounded border border-gray-600 text-white"
              ></textarea>
              <button onClick={() => { if(studentText) { setStudentMsgs([...studentMsgs, {id: Date.now(), text: studentText}]); setStudentText(''); alert('Sent to Admin!'); }}} className="bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded">
                Send Privately
              </button>
            </div>
          </div>
        )}

        {/* TEACHER PORTAL */}
        {role === 'teacher' && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-4 text-xs">
            <h2 className="text-lg font-bold text-yellow-400">Teacher Dashboard & Policies</h2>
            <div className="bg-red-900/30 border border-red-500 p-3 rounded space-y-1 text-gray-300">
              <p className="font-bold text-red-400">Rules & T&C:</p>
              <p>1. Students ke sath abhadra bhasha sakht mana hai.</p>
              <p>2. Referral fees: 97% Teacher / 3% Academy. Normal batch: 60% Teacher / 40% Academy.</p>
              <p>3. Class khatam hone par recording admin ko submit karni hogi.</p>
            </div>

            <div className="bg-gray-700 p-3 rounded space-y-2">
              <p className="font-bold text-yellow-300">Broadcast Message to Students:</p>
              <input type="text" value={teacherText} onChange={(e) => setTeacherText(e.target.value)} placeholder="Message likhein..." className="w-full bg-gray-800 p-2 rounded border border-gray-600 text-white" />
              <button onClick={() => { if(teacherText) { setTeacherMsgs([...teacherMsgs, {id: Date.now(), text: teacherText}]); setTeacherText(''); }}} className="bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded">Broadcast</button>
            </div>

            <div className="bg-gray-700 p-3 rounded space-y-2">
              <p className="font-bold text-yellow-300">Submit Class Recording Link:</p>
              <input type="text" value={recLink} onChange={(e) => setRecLink(e.target.value)} placeholder="Google Drive / YouTube link..." className="w-full bg-gray-800 p-2 rounded border border-gray-600 text-white" />
              <button onClick={() => { if(recLink) { setRecs([...recs, {id: Date.now(), link: recLink}]); setRecLink(''); alert('Submitted!'); }}} className="bg-yellow-500 text-gray-900 font-bold px-3 py-1.5 rounded">Submit to Admin</button>
            </div>
          </div>
        )}

        {/* ADMIN PORTAL */}
        {role === 'admin' && (
          <div className="bg-gray-800 rounded-lg p-4 border border-red-500 space-y-4 text-xs">
            <h2 className="text-lg font-bold text-red-400">Admin Private Dashboard</h2>
            {!isAdmin ? (
              <div className="space-y-2 max-w-xs">
                <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Admin Password (1234)" className="w-full bg-gray-700 p-2 rounded border border-gray-600 text-white" />
                <button onClick={() => { if(adminPass === '1234') setIsAdmin(true); else alert('Wrong password!'); }} className="bg-red-600 font-bold w-full py-2 rounded text-white">Login</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-900/40 p-2 rounded text-green-300">✔ Admin Access Verified</div>
                
                <div className="bg-gray-700 p-3 rounded space-y-2">
                  <p className="font-bold text-yellow-300">Manage Live Class Connection:</p>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-gray-800 p-2 rounded text-white border border-gray-600">
                    <option value="jitsi">Jitsi Meet (Free)</option>
                    <option value="google">Google Meet</option>
                  </select>
                  <input type="text" value={meetLink} onChange={(e) => setMeetLink(e.target.value)} className="w-full bg-gray-800 p-2 rounded text-white border border-gray-600" />
                  <button onClick={() => { setApproved(true); alert('Class connected for students!'); }} className="bg-green-600 font-bold px-3 py-1.5 rounded text-white">Approve & Connect Class</button>
                </div>

                <div className="bg-gray-700 p-3 rounded space-y-2">
                  <p className="font-bold text-yellow-300">Student Private Messages:</p>
                  {studentMsgs.length === 0 ? <p className="text-gray-400">No messages.</p> : studentMsgs.map(m => (
                    <div key={m.id} className="bg-gray-800 p-2 rounded text-white">{m.text}</div>
                  ))}
                </div>

                <div className="bg-gray-700 p-3 rounded space-y-2">
                  <p className="font-bold text-yellow-300">Update Notice / Notification Bar:</p>
                  <input type="text" value={noticeText} onChange={(e) => setNoticeText(e.target.value)} placeholder="New notice..." className="w-full bg-gray-800 p-2 rounded border border-gray-600 text-white" />
                  <button onClick={() => { if(noticeText) { setUpdates([{id:Date.now(), text: noticeText}, ...updates]); setNoticeText(''); }}} className="bg-yellow-500 font-bold text-gray-900 px-3 py-1.5 rounded">Publish Notice</button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      <footer className="text-center text-[10px] text-gray-500 mt-10">
        © 2026 RPS Music Talim Academy. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
