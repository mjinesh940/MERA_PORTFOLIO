import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import MyImage from '../images/My_Image.jpg';

const roles = [
  'SAP ABAP Developer',
  'Full Stack Engineer',
  'Java + React Builder',
  'Problem Solver',
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let i = typing ? displayed.length : displayed.length - 1;
    const speed = typing ? 60 : 35;

    if (typing && displayed === current) {
      const pause = setTimeout(() => setTyping(false), 1800);
      return () => clearTimeout(pause);
    }
    if (!typing && displayed === '') {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTyping(true);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(typing ? current.slice(0, i + 1) : current.slice(0, i));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="hero">
      {/* Ambient glow behind image */}
      <div className="hero-glow" />

      <div className="hero-image-wrap">
        <div className="hero-img-ring">
          <img src={MyImage} alt="Jinesh Modi" />
        </div>
        <div className="hero-badge">👨‍💻 Open to Work</div>
      </div>

      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">Jinesh Modi</h1>

        <div className="hero-role-wrap">
          <span className="hero-role-text">{displayed}</span>
          <span className="hero-cursor">|</span>
        </div>

        <p className="hero-desc">
          SAP ABAP · Java · React · Spring Boot · Web Technologies
        </p>

        <div className="hero-cta">
          <a
            href="https://drive.google.com/file/d/1_9vcv9c8irGRlV8xLlAadc17vDxn_yQM/view?usp=sharing"
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
          <a
            href="https://github.com/mjinesh940"
            className="btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">3+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">9+</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">5+</span>
            <span className="stat-label">Experiences</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;