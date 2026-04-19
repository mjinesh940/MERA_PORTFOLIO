import React, { useEffect, useRef } from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Custom Software Engineer',
    company: 'Accenture',
    duration: 'Current',
    location: 'India',
    description: [
      'Developing SAP ABAP programs including ALV Reports, Scripts, Smartforms, and Adobe Forms.',
      'Building and consuming OData services for SAP Fiori applications/ RAP applications',
      'Working with Function Modules, BAPIs, and User Exits for system enhancements.',
      'Wokring On CDS, ODATA For Better Performance'
    ],
    tech: ['SAP ABAP ON HANA', 'OData', 'Fiori', 'BAPI', 'SmartForms'],
    type: 'work',
  },

  {
    role: 'SAP ABAP Associate',
    company: 'Automatic Infotech',
    duration: 'Aug 2024 – Feb 2026',
    location: 'India',
    description: [
      'Developing SAP ABAP programs including ALV Reports, Scripts, Smartforms, and Adobe Forms.',
      'Building and consuming OData services for SAP Fiori applications.',
      'Working with Function Modules, BAPIs, and User Exits for system enhancements.',
    ],
    tech: ['SAP ABAP', 'OData', 'Fiori', 'BAPI', 'SmartForms'],
    type: 'work',
  },

  {
    role: 'Android Development Intern',
    company: 'GSI Group',
    duration: 'Sept 2024',
    location: 'India',
    description: [
      'Developed Android applications using Java and Android SDK.',
      'Collaborated with team members on UI/UX and feature implementation.',
      'Delivered functional prototypes within project timelines.',
    ],
    tech: ['Android', 'Java', 'Android SDK', 'XML'],
    type: 'internship',
  },

  {
    role: 'Java Full Stack Developer Trainee',
    company: 'QSpiders',
    duration: 'Jan 2024 – Aug 2024',
    location: 'Bangalore, India',
    description: [
      'Completed intensive training in Java, Spring Boot, Hibernate, and React.',
      'Built full-stack applications with RESTful APIs and responsive UIs.',
      'Earned Java Full Stack Development certification upon completion.',
    ],
    tech: ['Java', 'Spring Boot', 'Hibernate', 'React', 'REST APIs'],
    type: 'training',
  }
];

const typeColors = {
  work: '#00d9ff',
  training: '#a78bfa',
  internship: '#34d399',
  virtual: '#fb923c',
};

const typeLabels = {
  work: 'Work',
  training: 'Training',
  internship: 'Internship',
  virtual: 'Virtual Experience',
};

const Experience = () => {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience-page">
      <div className="exp-hero">
        <h1 className="exp-main-title">Experience</h1>
        <p className="exp-main-subtitle">My journey so far — roles, training & real-world exposure.</p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line" />

        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <div className="timeline-dot" style={{ borderColor: typeColors[exp.type] }} />

            <div className="exp-card" style={{ '--accent': typeColors[exp.type] }}>
              <span className="exp-type-badge" style={{ background: typeColors[exp.type] }}>
                {typeLabels[exp.type]}
              </span>
              <h2 className="exp-role">{exp.role}</h2>
              <h3 className="exp-company">{exp.company}</h3>
              <div className="exp-meta">
                <span className="exp-duration">📅 {exp.duration}</span>
                <span className="exp-location">📍 {exp.location}</span>
              </div>
              <ul className="exp-desc">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className="exp-tech-stack">
                {exp.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;