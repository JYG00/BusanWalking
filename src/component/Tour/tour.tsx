import { MouseEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { locationType } from '../Notice/notice';
import styles from './tour.module.css';

export default function Tour() {
  const location = useLocation() as locationType;
  const [state, setState] = useState<string>(location.state.key);

  const changeContent = (event: MouseEvent) => {
    const tableHead = event.currentTarget.getAttribute('id');

    if (tableHead === null) {
      alert('typeError');
    } else {
      setState(tableHead);
    }
  };

  // location 호출 시 setState
  useEffect(() => {
    setState(location.state.key);
  }, [location]);

  return (
    <div className={styles.container}>
      {/* 상태표시바 */}
      <div className={styles.slogan_bar}>
        <h2>{state}</h2>
      </div>
      {/* 여행지 테이블 */}
      <div className={styles.tour_table}>
        <div className={styles.table_head}>
          <p id="전체관광지" onClick={changeContent}>
            전체관광지
          </p>
          <p id="숲길" onClick={changeContent}>
            숲길
          </p>
          <p id="해안길" onClick={changeContent}>
            해안길
          </p>
          <p id="도심길" onClick={changeContent}>
            도심길
          </p>
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
