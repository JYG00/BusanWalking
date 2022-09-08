import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './email.module.css';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';
import { locationType } from '../Notice/notice';

export default function SendEmail() {
  const location = useLocation() as locationType;
  const [state, setState] = useState(location.state.key);
  const form = useRef<HTMLFormElement>(null);

  function sendEmail(e: FormEvent) {
    if (form.current !== null) {
      e.preventDefault();
      emailjs.sendForm('service_r95ni1c', 'template_93xhqst', form.current, 'moWHM-2VpRhgMWs8d').then(
        (result) => {
          window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        },
      );
    }
  }

  return (
    <div className={styles.email_form}>
      <form onSubmit={sendEmail} ref={form}>
        <input type="hidden" name="contact_number" />
        <label>Your Name</label>
        <input type="text" name="from_name" />
        <label>Your Email</label>
        <input type="email" name="from_email" />
        <label>Subject</label>
        <input type="text" name="subject" />
        <label>Message</label>
        <textarea name="html_message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
