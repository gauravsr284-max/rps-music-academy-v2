
import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0LnUDfFoRV8BWZFwrqTOB75QaOUamDQqoOqdCwAwLF98kxQ/viewform?usp=header'

const courses = [
  ['Tabla', 'तबला', '₹1,299 / month'],
  ['Sitar', 'सितार', '₹1,500 / month'],
  ['Guitar', 'गिटार', '₹1,500 / month'],
  ['Piano', 'पियानो', '₹1,500 / month'],
  ['Harmonium', 'हारमोनियम', '₹1,500 / month'],
  ['Vocal', 'गायन', '₹1,500 / month']
]

const styles = {
  page: { minHeight: '100vh', background: '#100e0b', color: '#f6f0e5', fontFamily: 'Inter, sans-serif' },
  header: { padding: '18px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid #514027' },
  brand: { color: '#d6ad62', fontFamily: 'Georgia, serif', fontSize: 21, fontWeight: 700 },
  button: { background: '#d6ad62', color: '#17120a', padding: '12px 18px', border: 0, borderRadius: 5, fontWeight: 700, cursor: 'pointer' },
  secondary: { background: 'transparent', color: '#d6ad62', padding: '11px 16px', border: '1px solid #d6ad62', borderRadius: 5, cursor: 'pointer' },
  section: { padding: '55px 7%' },
  muted: { color: '#b8ad9c', lineHeight: 1.8 },
  card: { background: '#1b1813', border: '1px solid #514027', borderRadius: 9, padding: 20 },
  input: { width: '100%', padding: 13, margin: '7px 0 16px', borderRadius: 5, border: '1px solid #685536', background: '#100e0b', color: '#fff', boxSizing: 'border-box' }
}

function Panel({ title, children }) {
  return <section style={{ ...styles.card, marginBottom: 18 }}>
    <h3 style={{ color: '#d6ad62', marginTop: 0 }}>{title}</h3>
    {children}
  </section>
}

function Stat({ label, value }) {
  return <div style={styles.card}>
    <div style={{ color: '#b8ad9c', fontSize: 13 }}>{label}</div>
    <div style={{ color: '#d6ad62', fontSize: 27, fontWeight: 700, marginTop: 8 }}>{value ?? '—'}</div>
  </div>
}

function App() {
  const [session, setSession] = useState(null)
  const [role, setRole] = useState('')
  const [profile, setProfile] = useState(null)
  const [data, setData] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data: result }) => {
      if (active) setSession(result.session)
      if (!result.session && active) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (active) {
        setSession(newSession)
        if (!newSession) {
          setRole('')
          setProfile(null)
          setData({})
          setLoading(false)
        }
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session?.user) loadDashboard(session.user)
  }, [session])

  async function loadDashboard(user) {
    setLoading(true)
    setError('')
    setData({})

    try {
      const { data: roleRow, error: roleError } = await supabase
        .from('academy_user_roles')
        .select('user_id, role, status')
        .eq('user_id', user.id)
        .maybeSingle()

      if (roleError) throw roleError
      if (!roleRow || !['admin', 'student', 'teacher'].includes(roleRow.role)) {
        setRole('')
        setError('आपका Academy role अभी उपलब्ध नहीं है। कृपया Admin से संपर्क करें।')
        return
      }

      if (roleRow.status && roleRow.status !== 'active') {
        setRole('')
        setError('आपका अकाउंट अभी सक्रिय नहीं है। कृपया Academy Admin से संपर्क करें।')
        return
      }

      setRole(roleRow.role)

      if (roleRow.role === 'admin') {
        const tables = [
          'academy_students',
          'academy_teachers',
          'academy_student_applications',
          'academy_teacher_applications',
          'academy_payments',
          'academy_class_sessions',
          'academy_messages'
        ]

        const counts = await Promise.all(tables.map(async (table) => {
          const { count, error: countError } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
          return [table, countError ? '—' : count]
        }))

        const { data: notices } = await supabase
          .from('academy_notices')
          .select('id, title, message, is_active, expires_at, target_audience')
          .order('created_at', { ascending: false })
          .limit(10)

        setData({ counts: Object.fromEntries(counts), notices: notices || [] })
      }

      if (roleRow.role === 'student') {
        const [studentResult, sessionsResult, noticesResult, materialsResult] = await Promise.all([
          supabase.from('academy_students').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('academy_class_sessions').select('*').eq('student_user_id', user.id).order('session_date', { ascending: true }).limit(20),
          supabase.from('academy_notices').select('id, title, message, created_at').eq('is_active', true).order('created_at', { ascending: false }).limit(10),
          supabase.from('academy_study_materials').select('id, title, description, course, material_type, storage_path, created_at').order('created_at', { ascending: false }).limit(30)
        ])

        if (studentResult.error) throw studentResult.error
        setProfile(studentResult.data)
        setData({
          sessions: sessionsResult.data || [],
          notices: noticesResult.data || [],
          materials: materialsResult.data || [],
          loadWarnings: [sessionsResult.error, noticesResult.error, materialsResult.error].filter(Boolean).map(e => e.message)
        })
      }

      if (roleRow.role === 'teacher') {
        const [teacherResult, sessionsResult, payoutsResult] = await Promise.all([
          supabase.from('academy_teachers').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('academy_class_sessions').select('*').eq('teacher_id', user.id).order('session_date', { ascending: true }).limit(30),
          supabase.from('academy_teacher_payouts').select('id, payment_month, gross_amount, teacher_share, payout_status, paid_at').eq('teacher_id', user.id).order('created_at', { ascending: false }).limit(12)
        ])

        if (teacherResult.error) throw teacherResult.error
        setProfile(teacherResult.data)
        setData({
          sessions: sessionsResult.data || [],
          payouts: payoutsResult.data || [],
          loadWarnings: [sessionsResult.error, payoutsResult.error].filter(Boolean).map(e => e.message)
        })
      }
    } catch (err) {
      setError(err.message || 'जानकारी लोड नहीं हो सकी।')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setBusy(true)
    setError('')

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    })

    if (loginError) setError(loginError.message)
    setBusy(false)
  }

  async function handleLogout() {
    setBusy(true)
    const { error: logoutError } = await supabase.auth.signOut()
    if (logoutError) setError(logoutError.message)
    setBusy(false)
  }

  function LoginBox() {
    return <div style={{ ...styles.card, maxWidth: 430, margin: '35px auto', padding: 28 }}>
      <h2 style={{ color: '#d6ad62' }}>Academy Login</h2>
      <p style={styles.muted}>अपने Admin, Student या Teacher अकाउंट से Login करें।</p>
      <form onSubmit={handleLogin}>
        <label>Email Address</label>
        <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <label>Password</label>
        <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        <button style={{ ...styles.button, width: '100%' }} disabled={busy}>
          {busy ? 'Please wait…' : 'Login'}
        </button>
      </form>
      <p style={{ ...styles.muted, fontSize: 12 }}>नया Student Registration केवल Official Google Form से होगा।</p>
      <a href={FORM_URL} target="_blank" rel="noreferrer" style={{ color: '#d6ad62' }}>Open Registration Form</a>
    </div>
  }

  function PublicSite() {
    return <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>RPS Music Academy <small style={{ display: 'block', fontSize: 10, letterSpacing: 4 }}>BANARAS</small></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="#courses" style={styles.secondary}>Courses</a>
          <button style={styles.button} onClick={() => setLoginOpen(true)}>Academy Login</button>
        </div>
      </header>

      <section style={{ ...styles.section, minHeight: 360, background: 'radial-gradient(ellipse at 80% 30%, #49351b, #100e0b 65%)' }}>
        <p style={{ color: '#d6ad62', letterSpacing: 3 }}>MUSIC EDUCATION • BANARAS</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(40px, 7vw, 72px)', maxWidth: 800 }}>Discover the Art of <span style={{ color: '#d6ad62' }}>Indian Music</span></h1>
        <p style={{ ...styles.muted, maxWidth: 620 }}>Learn music with dedication, discipline and expert guidance. Online and offline classes for children and adults.</p>
        <a href={FORM_URL} target="_blank" rel="noreferrer" style={{ ...styles.button, display: 'inline-block', textDecoration: 'none', marginTop: 18 }}>Register for Admission</a>
      </section>

      <section style={styles.section} id="courses">
        <h2 style={{ color: '#d6ad62' }}>Our Courses</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16, marginTop: 25 }}>
          {courses.map(c => <div key={c[0]} style={styles.card}>
            <div style={{ color: '#d6ad62' }}>{c[1]}</div>
            <h3>{c[0]}</h3>
            <p style={styles.muted}>{c[2]}</p>
            <a href={FORM_URL} target="_blank" rel="noreferrer" style={{ color: '#d6ad62' }}>Apply for this course →</a>
          </div>)}
        </div>
      </section>

      <section style={{ ...styles.section, background: '#17130e' }}>
        <h2 style={{ color: '#d6ad62' }}>About RPS Music Academy</h2>
        <p style={styles.muted}>A dedicated music learning environment in Banaras, welcoming beginners and advanced learners.</p>
        <p style={{ color: '#d6ad62', fontStyle: 'italic' }}>In the memory of Swargiya Rajani Priya Ji</p>
      </section>

      <section style={styles.section}>
        <h2 style={{ color: '#d6ad62' }}>Admissions & Contact</h2>
        <p style={styles.muted}>Indian registration ₹49 | International registration $5</p>
        <p style={styles.muted}>Email: gauravsr284@gmail.com</p>
        <p style={styles.muted}>WhatsApp: 8317041705 / 9452848161</p>
        <a href={FORM_URL} target="_blank" rel="noreferrer" style={{ color: '#d6ad62' }}>Official Registration Form</a>
      </section>
      <footer style={{ ...styles.section, textAlign: 'center', borderTop: '1px solid #514027' }}>
        <strong style={{ color: '#d6ad62' }}>RPS Music Academy – Banaras</strong>
        <p style={styles.muted}>Music education with dedication and discipline.</p>
      </footer>
      {loginOpen && <div style={{ position: 'fixed', inset: 0, background: '#000c', overflowY: 'auto', padding: 15, zIndex: 10 }}>
        <button style={styles.secondary} onClick={() => setLoginOpen(false)}>← Back to Website</button>
        <LoginBox />
      </div>}
    </div>
  }

  function AdminDashboard() {
    const labels = {
      academy_students: 'Students',
      academy_teachers: 'Teachers',
      academy_student_applications: 'Student Applications',
      academy_teacher_applications: 'Teacher Applications',
      academy_payments: 'Payments',
      academy_class_sessions: 'Class Sessions',
      academy_messages: 'Messages'
    }
    return <main style={styles.section}>
      <h1 style={{ color: '#d6ad62' }}>Admin Dashboard</h1>
      <p style={styles.muted}>Welcome, {session.user.email}. यह प्रारंभिक सुरक्षित Overview है।</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))', gap: 12, margin: '25px 0' }}>
        {Object.entries(labels).map(([key, label]) => <Stat key={key} label={label} value={data.counts?.[key]} />)}
      </div>
      <Panel title="Recent Notices">
        {data.notices?.length ? data.notices.map(n => <div key={n.id} style={{ borderBottom: '1px solid #514027', padding: '12px 0' }}>
          <strong>{n.title}</strong>
          <p style={styles.muted}>{n.message}</p>
          <small style={styles.muted}>Status: {n.is_active ? 'Active' : 'Inactive'} · Audience: {n.target_audience || 'All'}</small>
        </div>) : <p style={styles.muted}>अभी कोई Notice उपलब्ध नहीं है।</p>}
      </Panel>
    </main>
  }

  function StudentDashboard() {
    return <main style={styles.section}>
      <h1 style={{ color: '#d6ad62' }}>Student Dashboard</h1>
      <p style={styles.muted}>Welcome, {profile?.full_name || session.user.email}</p>
      <Panel title="My Profile">
        <p>Name: {profile?.full_name || 'Not available'}</p>
        <p>Course: {profile?.course || 'Not assigned'}</p>
        <p>Level: {profile?.learning_level || profile?.level || '—'}</p>
        <p>Admission: {profile?.approval_status || profile?.status || 'Pending'}</p>
        <p>Monthly Fee: {profile?.currency || 'INR'} {profile?.monthly_fee ?? '—'}</p>
        <p>Class Schedule: {profile?.class_schedule_text || 'Not scheduled yet'}</p>
        {profile?.approved_meeting_link && <a href={profile.approved_meeting_link} target="_blank" rel="noreferrer" style={{ color: '#d6ad62' }}>Open Approved Class Link</a>}
      </Panel>
      <Panel title="My Classes">
        {data.sessions?.length ? data.sessions.map(s => <p key={s.id}>{s.session_date} · {s.start_time} · {s.course} · {s.session_status}</p>) : <p style={styles.muted}>अभी कोई Class Schedule उपलब्ध नहीं है।</p>}
      </Panel>
      <Panel title="Study Materials">
        {data.materials?.length ? data.materials.map(m => <div key={m.id} style={{ padding: 10, borderBottom: '1px solid #514027' }}>
          <strong>{m.title}</strong><p style={styles.muted}>{m.description || m.course || ''}</p>
          <small style={styles.muted}>Type: {m.material_type || 'Material'}</small>
        </div>) : <p style={styles.muted}>अभी कोई Study Material उपलब्ध नहीं है।</p>}
      </Panel>
      <Panel title="Academy Notices">
        {data.notices?.length ? data.notices.map(n => <p key={n.id}>{n.title}: {n.message}</p>) : <p style={styles.muted}>कोई Notice नहीं है।</p>}
      </Panel>
    </main>
  }

  function TeacherDashboard() {
    return <main style={styles.section}>
      <h1 style={{ color: '#d6ad62' }}>Teacher Dashboard</h1>
      <p style={styles.muted}>Welcome, {profile?.full_name || session.user.email}</p>
      <Panel title="My Teacher Profile">
        <p>Name: {profile?.full_name || 'Not available'}</p>
        <p>Subjects: {Array.isArray(profile?.subjects) ? profile.subjects.join(', ') : profile?.subject || '—'}</p>
        <p>Qualification: {profile?.qualification || '—'}</p>
        <p>Experience: {profile?.experience || '—'}</p>
        <p>Approval: {profile?.approval_status || profile?.status || 'Pending'}</p>
      </Panel>
      <Panel title="My Class Schedule">
        {data.sessions?.length ? data.sessions.map(s => <p key={s.id}>{s.session_date} · {s.start_time} · {s.course} · {s.session_status}</p>) : <p style={styles.muted}>अभी कोई Class Schedule उपलब्ध नहीं है।</p>}
      </Panel>
      <Panel title="My Payouts">
        {data.payouts?.length ? data.payouts.map(p => <p key={p.id}>{p.payment_month} · {p.teacher_share} · {p.payout_status || 'Pending'}</p>) : <p style={styles.muted}>अभी कोई Payout Record उपलब्ध नहीं है।</p>}
      </Panel>
    </main>
  }

  if (loading) return <div style={{ ...styles.page, ...styles.section }}>Loading RPS Music Academy…</div>

  if (!session) return <PublicSite />

  return <div style={styles.page}>
    <header style={styles.header}>
      <div style={styles.brand}>RPS Music Academy <small style={{ display: 'block', fontSize: 10 }}>BANARAS</small></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ color: '#b8ad9c', fontSize: 12 }}>{session.user.email}</span>
        <button style={styles.secondary} onClick={() => loadDashboard(session.user)}>Refresh</button>
        <button style={styles.button} onClick={handleLogout} disabled={busy}>Logout</button>
      </div>
    </header>
    {error ? <main style={styles.section}><Panel title="Account Message"><p style={{ color: '#f0a58b' }}>{error}</p></Panel></main>
      : role === 'admin' ? <AdminDashboard />
      : role === 'student' ? <StudentDashboard />
      : role === 'teacher' ? <TeacherDashboard />
      : <main style={styles.section}><Panel title="Account Status">आपका Role उपलब्ध नहीं है। Admin से संपर्क करें।</Panel></main>}
    {data.loadWarnings?.length > 0 && <p style={{ ...styles.muted, padding: '0 7%' }}>कुछ सेक्शन लोड नहीं हुए: {data.loadWarnings.join(' | ')}</p>}
  </div>
}

export default App
                 
