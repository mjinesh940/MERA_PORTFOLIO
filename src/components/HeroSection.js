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
        <p>Full Stack Developer | Java | React | JavaScript | Web-Tech | ABAP</p>
      </div>
    </section>
  );
};

export default HeroSection;