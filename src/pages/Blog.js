import React from 'react';
import './Blog.css';
import qrImage1 from '../images/QR_REACT_HOOKS.jpg';
import qrImage2 from '../images/QR_SPRING_BOOT.jpg';
import qrImage3 from '../images/QR_API.png';
import qrImage4 from '../images/QR_ABAP_BASICS.png';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Understanding React Hooks',
      date: 'APR 12, 2025',
      link: 'https://jmshines940.blogspot.com/2025/04/common-challenges-when-using-react.html',
      excerpt: 'Explore the common challenges developers face when using React Hooks and how to overcome them effectively.',
      hasQR: true,
      qrImage: qrImage1
    },
    {
      title: 'Spring Boot Microservices',
      date: 'JUN 12, 2025',
      link: 'https://jmshines940.blogspot.com/2025/04/spring-boot-microservices-practical.html',
      excerpt: 'A beginner-friendly guide to building modular microservices using Spring Boot and best practices.',
      hasQR: true,
      qrImage: qrImage2
    },
    {
      title: 'Building Scalable APIs',
      date: 'JUL 20, 2025',
      link: 'https://jmshines940.blogspot.com/2025/07/building-scalable-apis.html',
      excerpt: 'Learn how to structure and scale your REST APIs using Java and modern architectural techniques.',
      hasQR: true,
      qrImage: qrImage3
    },
    {
      title: 'SAP ABAP BASICS',
      date: 'JUL 30, 2024',
      link: 'https://jmshines940.blogspot.com/2025/07/sap-system-abap-basics-your-gateway-to.html',
      excerpt: 'A guide to Learn how ABAP works for data manipulation (ALV reports, Scripts, smartforms, Adobe forms, Funtion modules, etc.)',
      hasQR: true,
      qrImage: qrImage4
    }
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-card">
            {post.link ? (
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-link">
                <h2 className="blog-post-title">{post.title}</h2>
              </a>
            ) : (
              <h2 className="blog-post-title">{post.title}</h2>
            )}
            <p className="blog-post-date">{post.date}</p>
            <p className="blog-post-excerpt">{post.excerpt}</p>
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More →
              </a>
            )}
            {post.hasQR && post.qrImage && 
              (<img src={post.qrImage} alt="QR Code to blog post" className="qr-code" />)
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;