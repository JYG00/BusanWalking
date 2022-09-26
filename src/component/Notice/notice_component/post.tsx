import styles from './post.module.css';

export default function Post() {

  return (
    <div className={styles.container}>
      <div className={styles.detail_table}>
        <form action="">
          {/* 제목 */}
       <input type="text" placeholder="제목"/>
          {/* 내용 */}
          <textarea cols={30} rows={10}></textarea>
          <button type='submit'>등록하기</button>
          </form>
          </div>
    </div>
  );
}
