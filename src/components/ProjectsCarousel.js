import React, { useEffect, useRef } from 'react';
import './ProjectsCarousel.css';

const projects = [
  {
    title: 'Scholarship Portal',
    description: 'A comprehensive solution for managing scholarship applications — from submission to approval, built with Java & Spring Boot.',
    link: 'https://github.com/mjinesh940/Scholarship-Portal',
    tech: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    title: 'Feed Forward Portal',
    description: 'An interactive platform for sharing feedback and suggestions with real-time updates and a clean React UI.',
    link: 'https://github.com/mjinesh940/Feed_Forward',
    tech: ['React', 'REST API', 'CSS'],
  },
  {
    title: 'Text & Sentiment Analysis',
    description: 'ML-powered application for text classification and sentiment detection using natural language processing algorithms.',
    link: 'https://github.com/mjinesh940/Text_Analysis',
    tech: ['Python', 'ML', 'NLP'],
  },
];

const ProjectsCarousel = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">
        Highlighted works showcasing my skills in development and problem-solving.
      </p>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card reveal"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ transitionDelay: `${index * 0.12}s` }}
          >
            <span className="project-number">0{index + 1}</span>
            <h3 className="project-name">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="exp-tech-stack" style={{ marginBottom: '1.2rem' }}>
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsCarousel;