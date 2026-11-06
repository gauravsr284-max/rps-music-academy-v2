import { useState } from "react";
import {
  Music2,
  Menu,
  X,
  ArrowRight,
  Guitar,
  Piano,
  Mic2,
  Globe2,
  ShieldCheck,
  BookOpen,
  Video,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "./lib/supabase";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf0LnUDfFoRV8BWZFwrqTOB75QaOUamDQqoOqdCwAwLF98kxq/viewform?usp=header";

const courses = [
  {
    name: "Tabla",
    detail: "Learn rhythm, taal, technique and solo performance.",
    icon: Music2
  },
  {
    name: "Sitar",
    detail: "Explore Indian classical melody and instrumental training.",
    icon: Music2
  },
  {
    name: "Guitar",
    detail: "Build your musical foundation and playing technique.",
    icon: Guitar
  },
  {
    name: "Piano & Harmonium",
    detail: "Learn melody, scales, accompaniment and composition.",
    icon: Piano
  },
  {
    name: "Vocal",
    detail: "Develop sur, taal, voice culture and musical expression.",
    icon: Mic2
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const hindi = language === "hi";

  const content = {
    home: hindi ? "होम" : "Home",
    courses: hindi ? "कोर्स" : "Courses",
    about: hindi ? "हमारे बारे में" : "About",
    register: hindi ? "अभी रजिस्टर करें" : "Register Now",
    headline: hindi
      ? "संगीत की शिक्षा, परंपरा और आधुनिकता के साथ"
      : "Learn Music with Tradition and Excellence",
    subheading: hindi
      ? "काशी की संगीत परंपरा से जुड़ें और अनुभवी मार्गदर्शन में अपनी संगीत यात्रा शुरू करें।"
      : "Connect with the musical heritage of Kashi and begin your journey with guided online and offline music lessons.",
    banner: hindi
      ? "आज ही रजिस्टर करें और RPS Family से जुड़ें"
      : "Register today and connect with the RPS Family",
    explore: hindi ? "कोर्स देखें" : "Explore Courses",
    aboutTitle: hindi ? "RPS Music Talim Academy" : "RPS Music Talim Academy",
    aboutText: hindi
      ? "हमारा उद्देश्य बच्चों और बड़ों को व्यवस्थित, गुणवत्तापूर्ण और व्यक्तिगत संगीत शिक्षा उपलब्ध कराना है।"
      : "Our mission is to provide structured, quality and personal music education to learners of all ages.",
    online: hindi ? "ऑनलाइन और ऑफलाइन कक्षाएँ" : "Online & Offline Classes",
    personal: hindi ? "व्यक्तिगत प्रशिक्षण" : "One-to-One Learning",
    global: hindi ? "भारत और विदेश के विद्यार्थी" : "Students in India & Abroad",
    founder: hindi ? "संस्थापक" : "Founder"
  };

  return (
    <div className="app-shell">
      <div className="top-strip">
        <span>RPS MUSIC TALIM ACADEMY</span>
        <span>KASHI · INDIA</span>
      </div>

      <header className="site-header">
        <Link to="/" className="brand" aria-label="RPS Academy Home">
          <div className="brand-mark">
            <Music2 size={25} />
          </div>
          <div>
            <strong>RPS MUSIC</strong>
            <small>TALIM ACADEMY</small>
          </div>
        </Link>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>{content.home}</a>
          <a href="#courses" onClick={() => setMenuOpen(false)}>{content.courses}</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>{content.about}</a>
          <a
            className="mobile-register"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.register}
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="language-button"
            onClick={() => setLanguage(hindi ? "en" : "hi")}
            type="button"
          >
            {hindi ? "English" : "हिन्दी"}
          </button>

          <a
            className="header-register"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.register}
          </a>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            type="button"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="eyebrow">THE MUSICAL HERITAGE OF KASHI</span>
            <h1>{content.headline}</h1>
            <p>{content.subheading}</p>
            <div className="hero-actions">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                {content.register} <ArrowRight size={18} />
              </a>
              <a href="#courses" className="secondary-button">
                {content.explore}
              </a>
            </div>
          </div>
          <div className="hero-caption">
            <span>TRADITION</span>
            <span className="caption-line"></span>
            <span>DISCIPLINE</span>
            <span className="caption-line"></span>
            <span>EXCELLENCE</span>
          </div>
        </section>

        <section className="announcement">
          <span className="announcement-dot"></span>
          <p>{content.banner}</p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hindi ? "रजिस्टर करें" : "Join Now"} <ArrowRight size={16} />
          </a>
        </section>

        <section className="features">
          <div className="feature">
            <Video />
            <div>
              <strong>{content.online}</strong>
              <small>{hindi ? "घर से सीखने की सुविधा" : "Learn from your location"}</small>
            </div>
          </div>
          <div className="feature">
            <Users />
            <div>
              <strong>{content.personal}</strong>
              <small>{hindi ? "हर विद्यार्थी पर व्यक्तिगत ध्यान" : "Individual attention for every learner"}</small>
            </div>
          </div>
          <div className="feature">
            <Globe2 />
            <div>
              <strong>{content.global}</strong>
              <small>{hindi ? "सीमाओं से परे संगीत शिक्षा" : "Music education without borders"}</small>
            </div>
          </div>
        </section>

        <section className="section courses-section" id="courses">
          <div className="section-heading">
            <span className="eyebrow">OUR PROGRAMS</span>
            <h2>{hindi ? "अपने संगीत का सफर चुनें" : "Choose Your Musical Journey"}</h2>
            <p>
              {hindi
                ? "शुरुआती से उन्नत स्तर तक व्यवस्थित संगीत प्रशिक्षण।"
                : "Structured music training from beginner to advanced levels."}
            </p>
          </div>

          <div className="course-grid">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <article className="course-card" key={course.name}>
                  <div className="course-icon"><Icon size={27} /></div>
                  <h3>{course.name}</h3>
                  <p>{course.detail}</p>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hindi ? "इस कोर्स के लिए आवेदन करें" : "Apply for this course"}
                    <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <span className="eyebrow">OUR VISION</span>
            <h2>{content.aboutTitle}</h2>
            <p>{content.aboutText}</p>
            <div className="founder-line">
              <ShieldCheck size={20} />
              <div>
                <small>{content.founder}</small>
                <strong>Swargiya Rajani Priya Ji | Kashi</strong>
              </div>
            </div>
          </div>
          <div className="about-emblem">
            <Music2 size={76} strokeWidth={1} />
            <span>RPS</span>
            <small>MUSIC · TALIM · KASHI</small>
          </div>
        </section>

        <section className="portal-intro">
          <div>
            <span className="eyebrow">STUDENT & TEACHER PORTAL</span>
            <h2>{hindi ? "आपका अपना Learning Portal" : "Your Learning Portal"}</h2>
            <p>
              {hindi
                ? "विद्यार्थियों और शिक्षकों के लिए सुरक्षित पोर्टल तैयार किया जा रहा है।"
                : "A secure portal for students, teachers and academy administration."}
            </p>
          </div>
          <div className="portal-status">
            <BookOpen size={24} />
            <span>
              <strong>{isSupabaseConfigured ? "Database settings detected" : "Database setup pending"}</strong>
              <small>
                {isSupabaseConfigured
                  ? "Authentication connection can be initialized."
                  : "Supabase environment settings are required."}
              </small>
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Music2 size={25} />
          <strong>RPS MUSIC TALIM ACADEMY</strong>
        </div>
        <p>Founder: Swargiya Rajani Priya Ji | Kashi</p>
        <div className="footer-contact">
          <a href="mailto:gauravsr284@gmail.com">gauravsr284@gmail.com</a>
          <a href="https://wa.me/918317041705" target="_blank" rel="noopener noreferrer">WhatsApp: 8317041705</a>
          <a href="https://wa.me/919452848161" target="_blank" rel="noopener noreferrer">9452848161</a>
        </div>
        <small>© {new Date().getFullYear()} RPS Music Talim Academy. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
