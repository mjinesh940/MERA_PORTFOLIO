import React from 'react';
import HeroSection from '../components/HeroSection';
import Skills from '../components/Skills';
import ProjectsCarousel from '../components/ProjectsCarousel';
import Certification from '../components/Certification';
import Enterprise_Projects from '../components/Enterprise_Projects';
import '../pages/Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <Skills />
      { /* <ProjectsCarousel /> */ }
      <Enterprise_Projects />
      <Certification />
    </div>
  );
};

export default Home;