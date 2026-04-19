import React, { useEffect, useRef } from 'react';
import './Blog.css';
import qrImage1 from '../images/QR_REACT_HOOKS.jpg';
import qrImage2 from '../images/QR_SPRING_BOOT.jpg';
import qrImage3 from '../images/QR_API.png';
import qrImage4 from '../images/QR_ABAP_BASICS.png';
import qrImage5 from '../images/QR_SAP_ODATA.png';

const blogPosts = [
  {
    title: 'Understanding React Hooks',
    date: 'APR 12, 2025',
    link: 'https://jmshines940.blogspot.com/2025/04/common-challenges-when-using-react.html',
    excerpt: 'Explore common challenges developers face when using React Hooks and how to overcome them effectively.',
    qrImage: qrImage1,
  },
  {
    title: 'Spring Boot Microservices',
    date: 'JUN 12, 2025',
    link: 'https://jmshines940.blogspot.com/2025/04/spring-boot-microservices-practical.html',
    excerpt: 'A beginner-friendly guide to building modular microservices using Spring Boot with industry best practices.',
    qrImage: qrImage2,
  },
  {
    title: 'Building Scalable APIs',
    date: 'JUL 20, 2025',
    link: 'https://jmshines940.blogspot.com/2025/07/building-scalable-apis.html',
    excerpt: 'Learn how to structure and scale REST APIs using Java and modern architectural techniques.',
    qrImage: qrImage3,
  },
  {
    title: 'SAP ABAP Basics',
    date: 'JUL 30, 2024',
    link: 'https://jmshines940.blogspot.com/2025/07/sap-system-abap-basics-your-gateway-to.html',
    excerpt: 'A guide to ABAP for data manipulation — ALV Reports, Scripts, Smartforms, Adobe Forms, Function Modules and more.',
    qrImage: qrImage4,
  },
  {
    title: 'SAP OData Services',
    date: 'JUL 26, 2025',
    link: 'https://jmshines940.blogspot.com/2025/07/odata-in-sap.html',
    excerpt: 'Learn how to create, implement, and consume SAP OData services using ABAP — from basics to advanced features.',
    qrImage: qrImage5,
  },
];

const Blog = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-hero">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-hero-sub">Thoughts, guides & deep dives on things I build and learn.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="blog-card reveal"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-post-title"
            >
              {post.title}
            </a>
            <p className="blog-post-date">{post.date}</p>
            <p className="blog-post-excerpt">{post.excerpt}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">
              Read Post →
            </a>
            {post.qrImage && (
              <img src={post.qrImage} alt={`QR for ${post.title}`} className="qr-code" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;