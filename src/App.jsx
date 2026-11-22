
import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf0LnUDfFoRV8BWZFwrqTOB75QaOUamDQqoOqdCwAwLF98kxQ/viewform?usp=header'

const courses = [
  { name: 'Tabla', hindi: 'तबला', fee: '₹1,299 / month' },
  { name: 'Sitar', hindi: 'सितार', fee: '₹1,500 / month' },
  { name: 'Guitar', hindi: 'गिटार', fee: '₹1,500 / month' },
  { name: 'Piano / Harmonium', hindi: 'पियानो / हारमोनियम', fee: '₹1,500 / month' },
  { name: 'Vocal Music', hindi: 'गायन', fee: '₹1,500 / month' }
]

export default function App() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        if (event === 'PASSWORD_RECOVERY') {
          setMode('reset')
          setLoginOpen(true)
          setMessage('अपना नया पासवर्ड बनाएँ।')
        }
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function loadRole() {
      if (!user) {
        setRole('')
        return
      }

      const { data, error } = await supabase
        .from('academy_user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!error) setRole(data?.role || 'student')
      else setRole('student')
    }

    loadRole()
  }, [user])

  useEffect(() => {
    async function loadCounts() {
      if (role !== 'admin') return

      const tables = [
        'academy_students',
        'academy_student_applications',
        'academy_teachers',
        'academy_teacher_applications',
        'academy_payments',
        'academy_class_sessions'
      ]

      const result = {}
      for (const table of tables) {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })

        result[table] = error ? '—' : count
      }
      setCounts(result)
    }

    loadCounts()
  }, [role])

  async function handleLogin(e) {
    e.preventDefault()
    setBusy(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    })

    setBusy(false)
    if (error) setMessage(error.message)
    else {
      setLoginOpen(false)
      setPassword('')
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault()
    setBusy(true)
    setMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: window.location.origin }
    )

    setBusy(false)
    setMessage(
      error
        ? error.message
        : 'यदि यह ईमेल पंजीकृत है, तो पासवर्ड रीसेट लिंक भेज दिया गया है। अपना Inbox और Spam फ़ोल्डर देखें।'
    )
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setMessage('')

    if (newPassword.length < 12) {
      setMessage('नया पासवर्ड कम से कम 12 अक्षरों का रखें।')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('दोनों पासवर्ड एक जैसे नहीं हैं।')
      return
    }

    setBusy(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    setBusy(false)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('पासवर्ड सफलतापूर्वक बदल गया।')
      setNewPassword('')
      setConfirmPassword('')
      setMode('login')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setRole('')
    setLoginOpen(false)
    setMode('login')
    setMessage('आप लॉगआउट हो गए हैं।')
  }

  const styles = `
    * { box-sizing: border-box; }
    body { margin: 0; background: #101010; color: #f5f0e6; font-family: Arial, sans-serif; }
    .app { min-height: 100vh; }
    .nav { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:18px 6%; border-bottom:1px solid #51432b; }
    .brand { color:#e6c27a; font-size:20px; font-weight:bold; }
    .btn { display:inline-block; border:0; border-radius:7px; padding:12px 18px; background:#d7ad62; color:#17120a; font-weight:bold; cursor:pointer; text-decoration:none; }
    .btn.secondary { background:transparent; color:#e6c27a; border:1px solid #b18b4e; }
    .hero { padding:75px 7%; text-align:center; background:linear-gradient(140deg,#201b13,#101010); }
    .hero h1 { color:#e6c27a; font-size:clamp(32px,6vw,56px); margin:10px 0; }
    .hero p { color:#d6d0c4; line-height:1.8; max-width:720px; margin:15px auto 25px; }
    .section { padding:45px 7%; }
    .section h2 { color:#e6c27a; }
    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:15px; }
    .card { background:#1d1b17; border:1px solid #51432b; padding:20px; border-radius:12px; }
    .card h3 { color:#e6c27a; }
    .muted { color:#bcb5a8; line-height:1.7; }
    .footer { padding:25px; text-align:center; border-top:1px solid #51432b; color:#aaa; }
    .panel { max-width:600px; margin:35px auto; padding:25px; background:#1d1b17; border:1px solid #51432b; border-radius:12px; }
    .field { width:100%; padding:13px; margin:8px 0 15px; border-radius:7px; border:1px solid #766344; background:#111; color:white; font-size:16px; }
    .message { padding:12px; margin:12px 0; border-radius:7px; background:#302819; color:#f1d79f; overflow-wrap:anywhere; }
    .link { color:#e6c27a; background:none; border:0; padding:10px 0; cursor:pointer; text-decoration:underline; }
    .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; }
    .stat { background:#211d16; border:1px solid #51432b; border-radius:10px; padding:17px; }
    .stat strong { display:block; color:#e6c27a; font-size:25px; margin-top:8px; }
    @media(max-width:600px) { .nav { padding:14px 4%; } .brand { font-size:16px; } .hero { padding:55px 5%; } .section { padding:35px 5%; } }
  `

  if (loading) {
    return <div className="panel">Loading Academy...</div>
  }

  return (
    <div className="app">
      <style>{styles}</style>

      <header className="nav">
        <div className="brand">RPS MUSIC ACADEMY</div>
        {user ? (
          <button className="btn secondary" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="btn secondary" onClick={() => {
            setMode('login')
            setMessage('')
            setLoginOpen(true)
          }}>Academy Login</button>
        )}
      </header>

      {user ? (
        <main className="section">
          <div className="panel">
            <p className="muted">Welcome to your Academy Dashboard</p>
            <h2>{role === 'admin' ? 'Admin Dashboard' : role === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}</h2>
            <p className="muted">Login: {user.email}</p>
            <p className="muted">Account role: {role || 'Loading...'}</p>

            <button className="btn" onClick={() => {
              setMode('change')
              setMessage('')
            }}>Change Password</button>

            {mode === 'change' && (
              <form onSubmit={handleChangePassword}>
                <h3>Change Password</h3>
                <input className="field" type="password" placeholder="New password (minimum 12 characters)" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                <input className="field" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <button className="btn" disabled={busy}>{busy ? 'Please wait...' : 'Update Password'}</button>
                <button type="button" className="link" onClick={() => setMode('login')}>Cancel</button>
              </form>
            )}
          </div>

          {role === 'admin' && (
            <div className="panel">
              <h2>Academy Overview</h2>
              <div className="stats">
                {[
                  ['Students', 'academy_students'],
                  ['Student Applications', 'academy_student_applications'],
                  ['Teachers', 'academy_teachers'],
                  ['Teacher Applications', 'academy_teacher_applications'],
                  ['Payments', 'academy_payments'],
                  ['Class Sessions', 'academy_class_sessions']
                ].map(([label, key]) => (
                  <div className="stat" key={key}>
                    {label}
                    <strong>{counts[key] ?? '...'}</strong>
                  </div>
                ))}
              </div>
              <p className="muted">यह शुरुआती Overview है। Applications approval, payments management, classes और notices के controls अगले चरण में जोड़ेंगे।</p>
            </div>
          )}

          {role !== 'admin' && (
            <div className="panel">
              <h2>Your Academy Space</h2>
              <p className="muted">आपका Dashboard login सक्रिय है। आपकी profile और assigned class सुविधाएँ अगले चरण में जोड़ी जाएँगी।</p>
            </div>
          )}
        </main>
      ) : (
        <main>
          <section className="hero">
            <p className="muted">In the memory of Swargiya Rajani Priya Ji</p>
            <h1>RPS Music Academy – Banaras</h1>
            <p>भारतीय शास्त्रीय संगीत की परंपरा और अनुशासन के साथ संगीत सीखें। Online और Offline classes, बच्चों से बड़ों तक, Beginner से Advanced स्तर तक।</p>
            <a className="btn" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">Apply for Admission</a>
          </section>

          <section className="section">
            <h2>Our Courses | हमारे कोर्स</h2>
            <div className="cards">
              {courses.map(course => (
                <div className="card" key={course.name}>
                  <h3>{course.name}</h3>
                  <p>{course.hindi}</p>
                  <p className="muted">{course.fee}</p>
                  <a className="link" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">Register</a>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Learn With Us</h2>
            <p className="muted">One-to-one music learning, dedicated guidance, and a focus on strong musical foundations.</p>
            <a className="btn" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">Register Now</a>
          </section>

          <section className="section">
            <h2>Contact the Academy</h2>
            <p>Email: gauravsr284@gmail.com</p>
            <p>WhatsApp: 8317041705 / 9452848161</p>
            <a className="btn" href="https://wa.me/918317041705" target="_blank" rel="noreferrer">Contact on WhatsApp</a>
          </section>
        </main>
      )}

      <footer className="footer">
        <strong>RPS Music Academy – Banaras</strong>
        <p>Music education with dedication and discipline.</p>
        <small>© {new Date().getFullYear()} RPS Music Academy. All rights reserved.</small>
      </footer>

      {loginOpen && !user && (
        <div style={{position:'fixed', inset:0, background:'#000c', zIndex:10, overflowY:'auto', padding:'20px'}}>
          <div className="panel">
            <button className="link" onClick={() => {
              setLoginOpen(false)
              setMessage('')
            }}>← Close</button>

            {mode === 'reset' ? (
              <>
                <h2>Set New Password</h2>
                <form onSubmit={handleChangePassword}>
                  <input className="field" type="password" placeholder="New password (minimum 12 characters)" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                  <input className="field" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  <button className="btn" disabled={busy}>{busy ? 'Please wait...' : 'Save New Password'}</button>
                </form>
              </>
            ) : mode === 'forgot' ? (
              <>
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                  <label>Email address</label>
                  <input className="field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your registered email" required />
                  <button className="btn" disabled={busy}>{busy ? 'Sending...' : 'Send Reset Link'}</button>
                </form>
                <button className="link" onClick={() => {
                  setMode('login')
                  setMessage('')
                }}>Back to Login</button>
              </>
            ) : (
              <>
                <h2>Academy Login</h2>
                <form onSubmit={handleLogin}>
                  <label>Email address</label>
                  <input className="field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Registered email" required />
                  <label>Password</label>
                  <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                  <button className="btn" disabled={busy}>{busy ? 'Signing in...' : 'Login'}</button>
                </form>
                <button className="link" onClick={() => {
                  setMode('forgot')
                  setMessage('')
                }}>Forgot Password?</button>
              </>
            )}

            {message && <div className="message">{message}</div>}
          </div>
        </div>
      )}
        </div>
  )
}
    
