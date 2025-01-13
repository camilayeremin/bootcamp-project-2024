import React, { useState } from 'react';
import styles from '@/src/styles/contactme.module.css';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email.');
      }

      setSuccess('Email sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setError('Failed to send email.');
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2>Contact Me</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className={styles.contactInput}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className={styles.contactInput}
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className={styles.contactTextarea}
          required
        />
        <button type="submit" className={styles.contactButton}>Send</button>
      </form>
    </div>
  );
};

export default ContactForm;