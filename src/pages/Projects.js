import React from 'react';
import ProjectsCarousel from '../components/ProjectsCarousel';
import Certification from '../components/Certification';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-page">
      <div className="projects-page-hero">
        <h1 className="projects-page-title">Projects And Certification</h1>
        <p className="projects-page-sub">Explore my highlighted works and hands-on experience.</p>
      </div>
      <ProjectsCarousel />
      <Certification />
    </div>
  );
};

export default Projects;