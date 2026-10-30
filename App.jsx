import React, { useState } from 'react';

const translations = {
  en: {
    academyName: "RPS Music Talim Academy",
    tagline: "Kashi's Classical Music Tradition",
    coursesTitle: "Our Specialized Courses",
    tabla: "Tabla (Major)",
    guitar: "Guitar",
    harmonium: "Harmonium",
    sitar: "Sitar",
    loginBtn: "Student / Teacher Login",
    registerBtn: "Register for Demo Class",
    joinLive: "Join Live Class",
    features: "Features: 1-to-1 Online Classes, Study Materials, Attendance & Payments",
    aboutTitle: "About The Academy",
    aboutDesc: "A complete Music Learning Management System (LMS) based in Varanasi, dedicated to preserving and teaching classical music traditions from beginner to advanced levels.",
    contactTitle: "Contact & Support",
    whatsappText: "Chat on WhatsApp for Admission & Demo",
    footerText: "© 2026 RPS Music Talim Academy | All Rights Reserved"
  },
  hi: {
    academyName: "RPS Music तालिम अकादमी",
    tagline: "काशी की शास्त्रीय संगीत परंपरा",
    coursesTitle: "हमारे विशेष कोर्सेज",
    tabla: "तबला (प्रमुख विषय)",
    guitar: "गिटार",
    harmonium: "हारमोनियम",
    sitar: "सितार",
    loginBtn: "विद्यार्थी / शिक्षक लॉगिन",
    registerBtn: "डेमो क्लास के लिए रजिस्टर करें",
    joinLive: "लाइव क्लास ज्वाइन करें",
    features: "विशेषताएं: 1-to-1 ऑनलाइन क्लास, स्टडी मटीरियल, अटेंडेंस और फीस स्टेटस",
    aboutTitle: "अकादमी के बारे में",
    aboutDesc: "वाराणसी (काशी) पर आधारित एक संपूर्ण म्यूजिक लर्निंग मैनेजमेंट सिस्टम (LMS), जो शुरुआती से लेकर एडवांस स्तर तक शास्त्रीय संगीत की शिक्षा देता है.",
    contactTitle: "संपर्क और सहायता",
    whatsappText: "एडमिशन और डेमो के लिए व्हाट्सएप पर संपर्क करें",
    footerText: "© 2026 RPS Music तालिम अकादमी | सर्वाधिकार सुरक्षित"
  }
};

export default function App() {
  const [lang, setLang] = useState('hi');
  const [page, setPage] = useState('home');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans">
      {/* Top Navbar */}
      <header className="bg-stone-900 text-amber-400 p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-lg md:text-xl font-bold cursor-pointer" onClick={() => setPage('home')}>
          {t.academyName}
        </h1>
        <div className="flex gap-2 md:gap-4 items-center">
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="bg-amber-500 text-stone-900 px-3 py-1 rounded font-semibold text-xs md:text-sm">
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button 
            onClick={() => setPage('login')}
            className="bg-amber-400 text-stone-900 px-3 md:px-4 py-1.5 rounded-lg font-bold text-xs md:text-sm">
            {t.loginBtn}
          </button>
        </div>
      </header>

      {/* Main Content Router */}
      {page === 'home' && (
        <>
          {/* Hero Section */}
          <section className="text-center py-12 md:py-16 px-4 bg-gradient-to-b from-stone-800 to-stone-900 text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-amber-400">{t.academyName}</h2>
            <p className="text-lg md:text-xl text-amber-200 mb-8 max-w-2xl mx-auto">{t.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => setPage('register')} className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-6 py-3 rounded-lg shadow-lg text-sm md:text-base">
                {t.registerBtn}
              </button>
              <button onClick={() => setPage('live')} className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-stone-900 font-bold px-6 py-3 rounded-lg text-sm md:text-base">
                {t.joinLive}
              </button>
            </div>
          </section>

          {/* Courses Section */}
          <section className="py-12 px-4 md:px-6 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-stone-800">{t.coursesTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: t.tabla, desc: "Banaras Gharana Solo & Talim" },
                { name: t.guitar, desc: "Classical & Acoustic Chords" },
                { name: t.harmonium, desc: "Swar Sadhana & Accompaniment" },
                { name: t.sitar, desc: "Tantrik Kari & Ragas" }
              ].map((course, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 text-center flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-stone-900">{course.name}</h4>
                    <p className="text-sm text-stone-600 mb-4">{course.desc}</p>
                  </div>
                  <button onClick={() => setPage('register')} className="bg-stone-900 text-amber-400 px-4 py-2 rounded text-sm font-semibold hover:bg-stone-800">
                    Enroll / Demo
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* About & Features Banner */}
          <section className="bg-stone-200 py-12 px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-stone-900">{t.aboutTitle}</h3>
              <p className="text-stone-700 mb-6 leading-relaxed">{t.aboutDesc}</p>
              <p className="text-amber-700 font-semibold">{t.features}</p>
            </div>
          </section>
        </>
      )}

      {page === 'login' && (
        <section className="py-16 px-4 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-stone-900">{t.loginBtn}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email / Mobile Number</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500" placeholder="Enter your email or phone" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password / OTP</label>
                <input type="password" className="w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500" placeholder="********" />
              </div>
              <button className="w-full bg-stone-900 text-amber-400 py-3 rounded-lg font-bold hover:bg-stone-800">
                Login to Dashboard
              </button>
              <button onClick={() => setPage('home')} className="w-full text-center text-sm text-stone-600 mt-2 underline">
                Back to Home
              </button>
            </div>
          </div>
        </section>
      )}

      {page === 'register' && (
        <section className="py-16 px-4 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-stone-900">Student Demo Registration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="Aapka naam" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">WhatsApp Number</label>
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Select Course</label>
                <select className="w-full p-3 border rounded-lg">
                  <option>Tabla (Major)</option>
                  <option>Guitar</option>
                  <option>Harmonium</option>
                  <option>Sitar</option>
                </select>
              </div>
              <button onClick={() => alert('Registration Successful! We will contact you on WhatsApp.')} className="w-full bg-amber-500 text-stone-900 py-3 rounded-lg font-bold">
                Submit Registration
              </button>
              <button onClick={() => setPage('home')} className="w-full text-center text-sm text-stone-600 mt-2 underline">
                Back to Home
              </button>
            </div>
          </div>
        </section>
      )}

      {page === 'live' && (
        <section className="py-16 px-4 max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200">
            <h3 className="text-2xl font-bold mb-4 text-stone-900">Live 1-to-1 Class Portal</h3>
            <p className="text-stone-600 mb-6">Enter your assigned Class ID or Token provided by your teacher to join the secure video session with Camera, Mic & Screen Sharing.</p>
            <input type="text" className="w-full p-3 border rounded-lg mb-4 text-center" placeholder="Enter Class ID (e.g. RPS-TABLA-01)" />
            <button onClick={() => alert('Connecting to live class video server...')} className="bg-stone-900 text-amber-400 px-6 py-3 rounded-lg font-bold w-full mb-4">
              Connect & Join Class
            </button>
            <button onClick={() => setPage('home')} className="text-sm text-stone-600 underline">
              Back to Home
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-6 mt-12 px-4">
        <p className="mb-2">{t.whatsappText}</p>
        <p className="text-xs text-amber-400 font-semibold mb-4">WhatsApp Contact: Available via direct link</p>
        <p className="text-xs">{t.footerText}</p>
      </footer>
    </div>
  );
                                                                                           }
                      
