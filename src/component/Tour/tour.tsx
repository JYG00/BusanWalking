import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import styles from './tour.module.css';

interface tourState {
  key: string;
  pageNumber: number;
  contentArr: Array<tourForm>;
}

export default function Tour() {
  const location = useLocation() as locationType;
  const tourArr: Array<tourForm> = [];
  const [state, setState] = useState<tourState>({ contentArr: tourArr, key: '전체관광지', pageNumber: 1 });
  const contentRef = useRef<HTMLDivElement>(null);
  const pageButtonRef = useRef<null | HTMLParagraphElement[]>([]);

  let pageBtnIdx = 0;

  useSelector((state: RootState) => {
    state.tour.map((content) => tourArr.push(content));
  });

  // key 값에 따라서 카테고리 변경
  const changeCategory = (key: string) => {
    switch (key) {
      case 'all':
        setState({ ...state, contentArr: tourArr, key: '전체관광지', pageNumber: 1 });
        break;
      case 'forest':
        let forestArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('숲길')).map((result) => forestArr.push(result));
        setState({ ...state, contentArr: forestArr, key: '숲길', pageNumber: 1 });
        break;
      case 'coast':
        let coastArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('해안길')).map((result) => coastArr.push(result));
        setState({ ...state, contentArr: coastArr, key: '해안길', pageNumber: 1 });
        break;
      case 'city':
        let cityArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('도심길')).map((result) => cityArr.push(result));
        setState({ ...state, contentArr: cityArr, key: '도심길', pageNumber: 1 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(location.state.key);
    changeCategory(location.state.key);
  }, [location]);

  useEffect(() => {
    if (contentRef.current !== null && pageButtonRef.current !== null) {
      // (페이지 번호 *  -(한 페이지 크기) )
      contentRef.current.style.top = `${(state.pageNumber - 1) * -1350}px`;
      pageButtonRef.current.map((content) => content !== null && (content.style.backgroundColor = 'red'));
      if (pageButtonRef.current[state.pageNumber] !== null) {
        pageButtonRef.current[state.pageNumber].style.backgroundColor = '#f3f3f3';
      }
    }
  }, [state.pageNumber]);

  // 테이블 헤드 클릭 시 카테고리 변경
  const changeContent = (event: MouseEvent) => {
    const key: string = event.currentTarget.id;
    if (key !== null) {
      changeCategory(key);
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
          <div ref={contentRef}>
            {state.contentArr.map((content) => (
              <div key={tourArr.indexOf(content)} className={styles.content} style={{ backgroundImage: `url(${content.mainImgSmall})`, backgroundSize: 'cover' }}></div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.page_button}>
        {/* 페이지 버튼  */}
        {(() => {
          console.log('on');
          // 한페이지에 6개 콘텐츠
          const key = state.contentArr.length;
          const pageNumber: number = Math.ceil(key / 9);
          let pageTag = [];
          for (let index: number = 1; index < pageNumber + 1; index++) {
            pageTag.push(
              <p
                key={index}
                id={String(index)}
                style={{ backgroundColor: 'red' }}
                onClick={(event: MouseEvent) => {
                  setState({ ...state, pageNumber: index });
                }}
                ref={(elem: HTMLParagraphElement) => {
                  if (pageButtonRef.current !== null) {
                    pageButtonRef.current[index] = elem;
                  }
                }}
              >
                {index}
              </p>,
            );
          }
          return pageTag;
        })()}
      </div>
    </div>
  );
}
