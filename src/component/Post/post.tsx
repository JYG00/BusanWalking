import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './post.module.css';
import { Link } from 'react-router-dom';

export default function Post() {
  const form = useRef<HTMLFormElement>(null);

  const posting = (event: FormEvent) => {};

  return (
    <div className={styles.container}>
      <Link to="/">
        <div>
          <h2>Home</h2>
        </div>
      </Link>
      <div className={styles.email_form}>
        <form onSubmit={posting} ref={form}>
          <label>제목</label>
          <input type="text" />
          <label>내용</label>
          <textarea name="html_message" />
          <input type="submit" value="등록" />
        </form>
      </div>
    </div>
  );
}
