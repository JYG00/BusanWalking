import styles from './notice.module.css';

export default function Notice() {
  return (
    <div className={styles.container}>
      {/* 슬로건 바 */}
      <div className={styles.slogan_bar}>
        <h2>명소공유</h2>
      </div>
      {/* 게시판 */}
      <div className={styles.notice_table}>
        <div className={styles.table_head}>
          <p>명소공유</p>
          <p>Q&A</p>
        </div>
        <div className={styles.table_body}>
          {/* 상단 : 제목, 검색할 내용, 검색버튼 */}
          <div></div>
          {/* 중간 : 게시글 */}
          <div></div>
          {/* 하단 : 등록 버튼 */}
          <div></div>
        </div>
        {/* 페이지 버튼  */}
        <div className={styles.page_button}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}