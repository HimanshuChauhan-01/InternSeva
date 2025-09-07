import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_2vsuoz6',
        'template_0t9si0d',
        form.current,
        '0Q1lJvJZHBtrirLXY'
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('Message sent successfully!');
          form.current.reset();
          setIsSubmitting(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again.');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="contact-container" id='contact-container'>
      <div className="con-head">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      
      <div className="main-content">
        {/* Left Section */}
        <div className="left">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/>
                </svg>
              </div>
              <div className="contact-text">
                <h3>Call Us</h3>
                <p>+91-98765XXXXX</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/>
                </svg>
              </div>
              <div className="contact-text">
                <h3>Email Us</h3>
                <p>internseva@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/>
                </svg>
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Greater Noida, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <input type="text" name="user-name" className="form-input" required />
                <label className="form-label">Your Name</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className="input-group">
                <input type="email" name="user-email" className="form-input" required />
                <label className="form-label">Your Email</label>
                <div className="input-highlight"></div>
              </div>
            </div>
            
            <div className="input-group textarea-group">
              <textarea name="user-message" className="form-input" required></textarea>
              <label className="form-label">Your Message</label>
              <div className="input-highlight"></div>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;