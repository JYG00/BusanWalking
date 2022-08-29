import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import { MdPlace } from 'react-icons/md';
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
  const contentHeadRef = useRef<null | HTMLParagraphElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageButtonRef = useRef<null | HTMLParagraphElement[]>([]);

  const navigate = useNavigate();

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
    changeCategory(location.state.key);
  }, [location]);

  useEffect(() => {
    if (contentRef.current !== null && pageButtonRef.current !== null) {
      // (페이지 번호 *  -(한 페이지 크기) )
      contentRef.current.style.top = `${(state.pageNumber - 1) * -1350}px`;
      pageButtonRef.current.map((content) => content !== null && (content.className = `${styles.button_off}`));
      if (pageButtonRef.current[state.pageNumber] !== null) {
        pageButtonRef.current[state.pageNumber].className = `${styles.button_on}`;
      }
    }
  }, [state.pageNumber]);

  useEffect(() => {
    if (contentHeadRef.current !== null) {
      contentHeadRef.current.map((content) => content !== null && (content.className = `${styles.table_head_off}`));
      switch (state.key) {
        case '전체관광지':
          contentHeadRef.current[0].className = `${styles.table_head_on}`;
          break;
        case '숲길':
          contentHeadRef.current[1].className = `${styles.table_head_on}`;
          break;
        case '해안길':
          contentHeadRef.current[2].className = `${styles.table_head_on}`;
          break;
        case '도심길':
          contentHeadRef.current[3].className = `${styles.table_head_on}`;
          break;
        default:
          break;
      }
    }
  }, [state.key]);

  // 테이블 헤드 클릭 시 카테고리 변경
  const changeContent = (event: MouseEvent) => {
    const key: string = event.currentTarget.id;
    if (key !== null) {
      changeCategory(key);
    }
  };

  const showDetail = (e: MouseEvent) => {
    navigate('/detail', { state: { key: e.currentTarget.id } });
  };

  return (
    <div className={styles.container}>
      {/* 상태표시바 */}
      <div className={styles.slogan_bar}>
        <div></div>
        <h2>{state?.key}</h2>
      </div>
      {/* 여행지 테이블 */}
      <div className={styles.tour_table}>
        <div className={styles.table_head}>
          <p
            id="all"
            onClick={changeContent}
            ref={(elem: HTMLParagraphElement) => {
              if (contentHeadRef.current !== null) {
                contentHeadRef.current[0] = elem;
              }
            }}
          >
            전체관광지
          </p>
          <p
            id="forest"
            onClick={changeContent}
            ref={(elem: HTMLParagraphElement) => {
              if (contentHeadRef.current !== null) {
                contentHeadRef.current[1] = elem;
              }
            }}
          >
            숲길
          </p>
          <p
            id="coast"
            onClick={changeContent}
            ref={(elem: HTMLParagraphElement) => {
              if (contentHeadRef.current !== null) {
                contentHeadRef.current[2] = elem;
              }
            }}
          >
            해안길
          </p>
          <p
            id="city"
            onClick={changeContent}
            ref={(elem: HTMLParagraphElement) => {
              if (contentHeadRef.current !== null) {
                contentHeadRef.current[3] = elem;
              }
            }}
          >
            도심길
          </p>
        </div>
        <div className={styles.table_body}>
          <div ref={contentRef}>
            {state.contentArr.map((content) => (
              <div key={tourArr.indexOf(content)} className={styles.content}>
                {/* 관광지 사진 */}
                <div>
                  <img src={content.mainImgSmall} alt="tour" onClick={showDetail} id={content.place} />
                </div>
                <div>
                  <p>
                    <MdPlace size={30} />
                  </p>
                  {/* 장소명 */}
                  <p>{content.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.page_button}>
        {/* 페이지 버튼  */}
        {(() => {
          // 한페이지에 9개 콘텐츠
          const key = state.contentArr.length;
          const pageNumber: number = Math.ceil(key / 9);
          let pageTag = [];
          for (let index: number = 1; index < pageNumber + 1; index++) {
            pageTag.push(
              <p
                key={index}
                id={String(index)}
                className={styles.button_off}
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
