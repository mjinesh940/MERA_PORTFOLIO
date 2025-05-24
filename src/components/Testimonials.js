import React from 'react';
import './testimonial.css';

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer at XYZ Corp",
    text: "Jinesh is an exceptional developer! His attention to detail and problem-solving skills are unparalleled.",
    img: "path/to/image1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Product Manager at ABC Ltd.",
    text: "Working with Jinesh was a wonderful experience. He brings creativity and technical expertise to every project.",
    img: "path/to/image2.jpg",
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  return (
    <section className="testimonials">
      <h2 className="section-title">What Others Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.img} alt={testimonial.name} className="testimonial-img" />
            <div className="testimonial-content">
              <p className="testimonial-text">{testimonial.text}</p>
              <h4 className="testimonial-name">{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;