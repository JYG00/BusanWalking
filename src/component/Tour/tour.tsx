import styles from './tour.module.css';

export default function Tour() {
  return (
    <div className={styles.container}>
      {/* 슬로건 바 */}
      <div className={styles.slogan_bar}>
        <h2>SLOGAN</h2>
      </div>
      {/* 여행지 테이블 */}
      <div className={styles.tour_table}>
        <div className={styles.table_head}>
          <p>전체관광지</p>
          <p>숲길</p>
          <p>해안길</p>
          <p>도심길</p>
        </div>
        <div className={styles.table_body}>
          <div>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div>
            <p>4</p>
            <p>5</p>
            <p>6</p>
          </div>
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
