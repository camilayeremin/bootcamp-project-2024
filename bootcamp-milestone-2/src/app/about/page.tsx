"use client"
import React, { useState } from "react";
import styles from "./contactme.module.css";
import emailjs from 'emailjs-com';

export default function ContactMe() {
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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string;

      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS environment variables are not set.');
      }

      const templateParams = {
        name,
        email,
        message,
      };

      console.log('Sending email with params:', templateParams);


      await emailjs.send(serviceId, templateId, templateParams, userId);

      setSuccess('Email sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);

      setError('Failed to send email.');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>Contact Me</h1>
      <p className={styles.contactSubtitle}>
        I'd love to hear from you! Please feel free to reach out ٩(^ᗜ^ )و ´
      </p>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className={styles.textArea}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  );
}