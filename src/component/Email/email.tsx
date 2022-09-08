import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './email.module.css';
import emailjs from 'emailjs-com';
import { useLocation, Link } from 'react-router-dom';
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
          alert('메일이 전송되었습니다');
        },
        (error) => {
          alert('메일이 전송에 실패하였습니다.');
        },
      );
    }
  }

  return (
    <div className={styles.container}>
      <Link to="/">
        <div>
          <h2>Home</h2>
        </div>
      </Link>
      <div className={styles.email_form}>
        <form onSubmit={sendEmail} ref={form}>
          <input type="hidden" name="contact_number" />
          <label>이름</label>
          <input type="text" name="from_name" />
          <label>이메일 주소</label>
          <input type="email" name="from_email" />
          <label>제목</label>
          <input type="text" name="subject" />
          <label>내용</label>
          <textarea name="html_message" />
          <input type="submit" value="메일 전송" />
        </form>
      </div>
    </div>
  );
}
