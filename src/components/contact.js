import React, { useState } from "react";
import "../layout/contact.css"; 

const Contact = () => {
  const [isMessageSent, setIsMessageSent] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault(); 
        setIsMessageSent(true);
    alert("Message sent"); 
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}> 
        <label className="contact-label">Name</label>
        <input
          type="text"
          placeholder="Jana Martins"
          className="contact-input"
          required
        />

        <label className="contact-label">Email</label>
        <input
          type="email"
          placeholder="hello@reallygreatsite.com"
          className="contact-input"
          required
        />

        <label className="contact-label">Message</label>
        <textarea
          placeholder="Write your message here"
          className="contact-input contact-textarea"
          required
        />

        <button type="submit" className="contact-button">
          Send the message
        </button>
      </form>
      {isMessageSent && <p className="success-message">Your message has been sent!</p>}
    </div>
  );
};

export default Contact;
