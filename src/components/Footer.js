import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Jinesh Modi | Software Engineer</p>
    </footer>
  );
};

export default Footer;