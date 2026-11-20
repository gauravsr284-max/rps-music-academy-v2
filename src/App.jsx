
import React from 'react'

const REGISTRATION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf0LnUDfFoRV8BWZFwrqTOB75QaOUamDQqoOqdCwAwLF98kxQ/viewform?usp=header'

const courses = [
  { name: 'Tabla', hindi: 'तबला', fee: '₹1,299 / month', description: 'Learn the traditional Banaras Gharana style.' },
  { name: 'Sitar', hindi: 'सितार', fee: '₹1,500 / month', description: 'Learn classical sitar from the foundations.' },
  { name: 'Guitar', hindi: 'गिटार', fee: '₹1,500 / month', description: 'Build musical skills step by step.' },
  { name: 'Piano', hindi: 'पियानो', fee: '₹1,500 / month', description: 'Develop melody, rhythm and technique.' },
  { name: 'Harmonium', hindi: 'हारमोनियम', fee: '₹1,500 / month', description: 'Learn accompaniment and classical music.' },
  { name: 'Vocal', hindi: 'गायन', fee: '₹1,500 / month', description: 'Learn Indian classical vocal music.' }
]

function App() {
  return (
    <div className="academy-app">
      <div className="notice-bar">
        Aaj hi register karein aur RPS family se judein
      </div>

      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">RPS</span>
          <span>
            <strong>RPS MUSIC TALIM ACADEMY</strong>
            <small>KASHI · BANARAS GHARANA</small>
          </span>
        </a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#courses">Courses</a>
          <a href="#fees">Fees</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="header-button"
          href={REGISTRATION_URL}
          target="_blank"
          rel="noreferrer"
        >
          Register Now
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE TRADITION OF KASHI · THE LANGUAGE OF MUSIC</p>

            <h1>
              Learn Music.
              <br />
              <span>Live the Tradition.</span>
            </h1>

            <p className="hero-description">
              Discover the beauty of Indian classical music with
              RPS Music Talim Academy, Kashi.
              Learn from beginner to advanced levels through
              personal online and offline music classes.
            </p>

            <div className="hero-actions">
              <a
                className="primary-button"
                href={REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Apply for Admission
              </a>

              <a className="secondary-button" href="#courses">
                Explore Courses
              </a>
            </div>

            <div className="hero-details">
              <span>Personal Learning</span>
              <span>Online & Offline</span>
              <span>All Age Groups</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Indian classical music">
            <div className="music-symbol">♫</div>
            <div className="hero-art-text">
              <span>THE ART OF</span>
              <strong>INDIAN<br />CLASSICAL MUSIC</strong>
              <small>Rooted in Kashi</small>
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <p className="eyebrow">OUR HERITAGE</p>
          <h2>Music is a tradition to be lived.</h2>
          <p>
            RPS Music Talim Academy is dedicated to preserving
            and sharing the musical heritage of Kashi and the
            Banaras Gharana. Our aim is to make quality music
            education accessible to children and adults.
          </p>
          <p className="founder-line">
            In loving memory of Swargiya Rajani Priya Ji · Kashi
          </p>
        </section>

        <section className="courses-section section" id="courses">
          <p className="eyebrow">EXPLORE YOUR MUSICAL JOURNEY</p>
          <h2>Our Courses</h2>
          <p className="section-intro">
            Personal music learning for beginners and advanced students.
          </p>

          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.name}>
                <span className="course-hindi">{course.hindi}</span>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <strong className="course-fee">{course.fee}</strong>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply for this course →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="fees-section section" id="fees">
          <p className="eyebrow">ADMISSION & FEES</p>
          <h2>Simple and transparent fees</h2>

          <div className="fee-panel">
            <div>
              <span>Indian Registration Fee</span>
              <strong>₹49</strong>
            </div>
            <div>
              <span>Tabla Monthly Fee</span>
              <strong>₹1,299</strong>
            </div>
            <div>
              <span>Other Courses Monthly Fee</span>
              <strong>₹1,500</strong>
            </div>
            <div>
              <span>International Monthly Fee</span>
              <strong>$40–$80</strong>
            </div>
            <div>
              <span>International Registration</span>
              <strong>$5</strong>
            </div>
          </div>

          <p className="fee-note">
            Admission and payment details will be confirmed by the Academy.
          </p>
        </section>

        <section className="learning-section section">
          <p className="eyebrow">A PERSONAL LEARNING EXPERIENCE</p>
          <h2>Learn with individual attention.</h2>
          <div className="learning-grid">
            <article>
              <h3>One-to-One Classes</h3>
              <p>Individual 60-minute learning sessions. No group classes.</p>
            </article>
            <article>
              <h3>Online & Offline</h3>
              <p>Choose the learning mode available for your course.</p>
            </article>
            <article>
              <h3>Study Materials</h3>
              <p>Learning notes and practice resources for students.</p>
            </article>
          </div>
        </section>

        <section className="admission-section" id="contact">
          <p className="eyebrow">BEGIN YOUR MUSICAL JOURNEY</p>
          <h2>Become a part of the RPS family.</h2>
          <p>
            Complete the official admission application using our
            Google Form.
          </p>
          <a
            className="primary-button"
            href={REGISTRATION_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open Registration Form
          </a>

          <div className="contact-details">
            <p>WhatsApp: +91 8317041705</p>
            <p>WhatsApp: +91 9452848161</p>
            <p>Email: gauravsr284@gmail.com</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>RPS MUSIC TALIM ACADEMY – KASHI</strong>
        <p>Preserving the musical heritage of Banaras.</p>
        <small>© {new Date().getFullYear()} RPS Music Talim Academy. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App
