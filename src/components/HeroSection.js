import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import MyImage from '../images/My_Image.jpg';

const HeroSection = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTextVisible(true);
    }, 3000);
  }, []);

  return (
    <section className="hero">
      <div className="hero-image">
        <img src={MyImage} alt="Hero" />
      </div>
      <div className="hero-content">
        <h1>
          Hi, I’m Jinesh, <span className={isTextVisible ? 'fade-in red-text' : 'red-text'}>Software Engineer</span>
        </h1>
        <p>SAP-ABAP | Full Stack Developer | Java | React | JavaScript | Web-Tech</p>

        <div className="cta-section">
          <a href="https://drive.google.com/file/d/1_9vcv9c8irGRlV8xLlAadc17vDxn_yQM/view?usp=sharing" 
             className="cta-button">Download My Resume</a>
          <a href="https://github.com/mjinesh940" 
             className="cta-button">Visit My GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;