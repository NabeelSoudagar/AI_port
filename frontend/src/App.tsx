import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ChatBot from './components/ChatBot'
import './index.css'

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:8000/portfolio')
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => console.error("Error fetching portfolio:", err))

    // Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Hero basics={portfolio?.basics} />
        <Skills skills={portfolio?.skills} />
        <Experience work={portfolio?.work} />
        <Projects projects={portfolio?.projects} />
      </main>
      <ChatBot />
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
        © {new Date().getFullYear()} {portfolio?.basics?.name}. Built with AI & Passion.
      </footer>
    </div>
  )
}

export default App
