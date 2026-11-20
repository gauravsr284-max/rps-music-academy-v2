
import React from 'react'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf0LnUDfFoRV8BWZFwrqTOB75QaOUamDQqoOqdCwAwLF98kxQ/viewform?usp=header'

const courses = [
  { name: 'Tabla', hindi: 'तबला', fee: '₹1,299 / month', detail: 'Indian classical percussion training' },
  { name: 'Sitar', hindi: 'सितार', fee: '₹1,500 / month', detail: 'Traditional instrumental learning' },
  { name: 'Guitar', hindi: 'गिटार', fee: '₹1,500 / month', detail: 'Beginner to advanced lessons' },
  { name: 'Piano', hindi: 'पियानो', fee: '₹1,500 / month', detail: 'Structured keyboard training' },
  { name: 'Harmonium', hindi: 'हारमोनियम', fee: '₹1,500 / month', detail: 'Practical music education' },
  { name: 'Vocal', hindi: 'गायन', fee: '₹1,500 / month', detail: 'Voice and classical music training' }
]

function App() {
  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">RPS</span>
          <span>
            <strong>RPS Music Academy</strong>
            <small> BANARAS</small>
          </span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-apply" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
          Apply Now
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">MUSIC EDUCATION • BANARAS</p>
          <h1>Discover the Art of <span>Indian Music</span></h1>
          <p className="hero-text">
            Learn music with dedication, discipline and expert guidance.
            Classes are available online and offline for children and adults.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
              Register for Admission
            </a>
            <a className="secondary-button" href="#courses">Explore Courses</a>
          </div>

          <p className="hero-note">Beginner to advanced • Children to adults • Online and offline</p>
        </section>

        <section className="notice-section">
          <span>ACADEMY NOTICE</span>
          <p>Admissions are open. Register today and become a part of the RPS Music Academy family.</p>
        </section>

        <section className="section" id="courses">
          <p className="eyebrow">OUR PROGRAMMES</p>
          <h2>Explore Our Courses</h2>
          <p className="section-intro">
            Choose your instrument or vocal programme and begin your musical journey.
          </p>

          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.name}>
                <span className="course-hindi">{course.hindi}</span>
                <h3>{course.name}</h3>
                <p>{course.detail}</p>
                <strong>{course.fee}</strong>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                  Apply for this course →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <p className="eyebrow">ABOUT THE ACADEMY</p>
          <h2>Music, Learning and Dedication</h2>
          <p>
            RPS Music Academy – Banaras is dedicated to providing structured
            music education in a supportive learning environment. Our programmes
            welcome learners of different ages and experience levels.
          </p>
          <p>
            Students can learn through online or offline classes, subject to
            course and teacher availability.
          </p>
          <p className="founder">In the memory of Swargiya Rajani Priya Ji</p>
        </section>

        <section className="admission-section">
          <p className="eyebrow">ADMISSIONS</p>
          <h2>Begin Your Musical Journey</h2>
          <p>
            Student registration is completed through our official Google Form.
            Submit your details there for admission review.
          </p>
          <p>Registration fee: ₹49 for Indian applicants | $5 for international applicants</p>
          <a className="primary-button" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
            Open Registration Form
          </a>
        </section>

        <section className="section contact-section" id="contact">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Contact the Academy</h2>
          <p>Email: gauravsr284@gmail.com</p>
          <p>WhatsApp: 8317041705 / 9452848161</p>
          <a
            className="primary-button"
            href="https://wa.me/918317041705"
            target="_blank"
            rel="noreferrer"
          >
            Contact on WhatsApp
          </a>
        </section>
      </main>

      <footer>
        <strong>RPS Music Academy – Banaras</strong>
        <p>Music education with dedication and discipline.</p>
        <small>© {new Date().getFullYear()} RPS Music Academy. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App
      
