import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
                                  e.email = 'Valid email is required';
    if (!formData.message.trim()) e.message = 'Message cannot be empty';
    return e;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      e.preventDefault();
      setErrors(formErrors);
    } else {
      setErrors({});
      setSuccessMessage('✅ Your message has been sent! I\'ll get back to you soon.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">Feel free to reach out — I'd love to connect!</p>
      </div>

      <div className="contact-wrapper">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <input type="hidden" name="access_key" value="59d43ca9-5333-44f0-840c-01ab6f77be54" />

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              required
            />
            {errors.message && <p className="error-text">{errors.message}</p>}
          </div>

          <button type="submit" className="contact-btn">Send Message ↗</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;