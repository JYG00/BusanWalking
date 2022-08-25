import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import styles from './tour.module.css';

interface tourState {
  key: string;
  contentArr: Array<tourForm>;
}

export default function Tour() {
  const location = useLocation() as locationType;
  let tourArr: Array<tourForm> = [];
  const [state, setState] = useState<tourState>({ contentArr: tourArr, key: '전체관광지' });

  useSelector((state: RootState) => {
    state.tour.map((content) => tourArr.push(content));
  });

  useEffect(() => {
    setState({ key: location.state.key, contentArr: tourArr });
  }, [location]);

  useEffect(() => {
    if (state !== undefined) {
      switch (state.key) {
        case 'all':
          setState({ ...state, contentArr: tourArr, key: '전체관광지' });
          break;
        case 'forest':
          let forestArr: Array<tourForm> = [];
          tourArr.filter((content) => content.category.includes('숲길')).map((result) => forestArr.push(result));
          setState({ ...state, contentArr: forestArr, key: '숲길' });
          break;
        case 'coast':
          let coastArr: Array<tourForm> = [];
          tourArr.filter((content) => content.category.includes('해안길')).map((result) => coastArr.push(result));
          setState({ ...state, contentArr: coastArr, key: '해안길' });
          break;
        case 'city':
          let cityArr: Array<tourForm> = [];
          tourArr.filter((content) => content.category.includes('도심길')).map((result) => cityArr.push(result));
          setState({ ...state, contentArr: cityArr, key: '도심길' });
          break;
        default:
          break;
      }
    }
  }, [state.key]);

  const changeContent = (event: MouseEvent) => {
    const key = event.currentTarget.getAttribute('id');
    if (key !== null) {
      setState({ ...state, key: key });
    }
  };

  return (
    <div className={styles.container}>
      {/* 상태표시바 */}
      <div className={styles.slogan_bar}>
        <h2>{state?.key}</h2>
      </div>
      {/* 여행지 테이블 */}
      <div className={styles.tour_table}>
        <div className={styles.table_head}>
          <p id="all" onClick={changeContent}>
            전체관광지
          </p>
          <p id="forest" onClick={changeContent}>
            숲길
          </p>
          <p id="coast" onClick={changeContent}>
            해안길
          </p>
          <p id="city" onClick={changeContent}>
            도심길
          </p>
        </div>
        <div className={styles.table_body}>
          <div>
            {state.contentArr.map((content) => (
              <div key={tourArr.indexOf(content)} className={styles.content} style={{ backgroundImage: `url(${content.mainImgSmall})`, backgroundSize: 'cover' }}></div>
            ))}
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
