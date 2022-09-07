import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import styles from './search.module.css';

interface locationForm {
  state: {
    key: string;
  };
}

export default function Search() {
  const location = useLocation() as locationForm;
  const tourArr: Array<tourForm> = useSelector((state: RootState) => state.tour);
  let resultArr: Array<tourForm> = [];

  const key = useMemo(() => {
    const key = location.state.key;
    return key;
  }, [location]);

  useEffect(() => {
    resultArr = [];
    tourArr.filter((content) => content.description.includes(key)).map((result) => resultArr.push(result));
    console.log(resultArr);
  }, []);

  return (
    <div className={styles.container}>
      {/* 슬로건 바 */}
      <div className={styles.slogan_bar}>{key}에 대한 검색결과</div>
      {/* 게시판 */}
      <div className={styles.notice_table}>
        <div className={styles.table_body}></div>
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
