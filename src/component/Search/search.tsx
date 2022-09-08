import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import styles from './search.module.css';
import { MdPlace } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';

interface locationForm {
  state: {
    key: string;
  };
}

export default function Search() {
  const location = useLocation() as locationForm;
  const [pgState, setPgState] = useState<number>(1);
  const tourArr: Array<tourForm> = useSelector((state: RootState) => state.tour);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageButtonRef = useRef<null | HTMLParagraphElement[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const result = useMemo(() => {
    setPgState(1);
    const result = tourArr.filter((content) => content.description.includes(location.state.key));
    return result;
  }, [location]);

  const showDetail = (e: MouseEvent) => {
    navigate('/detail', { state: { key: e.currentTarget.id } });
  };

  useEffect(() => {
    if (contentRef.current !== null && pageButtonRef.current !== null) {
      // (페이지 번호 *  -(한 페이지 크기) )
      if (!pgState) return;
      contentRef.current.style.top = `${(pgState - 1) * -1356}px`;
      pageButtonRef.current.map((content) => content !== null && (content.className = `${styles.button_off}`));
      if (pageButtonRef.current[pgState]) {
        pageButtonRef.current[pgState].className = `${styles.button_on}`;
      }
      if (bannerRef.current) {
        bannerRef.current.scrollIntoView();
      }
    }
  }, [pgState]);

  return (
    <div className={styles.container}>
      {/* 배너 */}
      <div className={styles.banner} ref={bannerRef}>
        <h2>{location.state.key}에 대한 검색결과</h2>
        <i>
          <BiSearch style={{ fill: '#777' }} />
        </i>
      </div>
      {/* 검색 결과 */}
      <div className={styles.search_result}>
        <div className={styles.search_result_in}>
          <div ref={contentRef}>
            {result.length !== 0 ? (
              result.map((result) => (
                <div key={result.place} className={styles.place}>
                  {/* 관광지 사진 */}
                  <div style={{ background: `url(${result.mainImgSmall})`, backgroundSize: '100% 100%' }}>
                    <img src={result.mainImgSmall} alt="tour" onClick={showDetail} id={result.place} />
                  </div>
                  {/* 관광지명 */}
                  <div>
                    <p>
                      <MdPlace size={30} />
                    </p>
                    <h4>{result.place}</h4>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.search_none}>{location.state.key}에 대한 검색결과가 없습니다</div>
            )}
          </div>
        </div>
      </div>
      {/* 페이지 버튼  */}
      <div className={styles.page_button}>
        {(() => {
          // 한페이지에 9개 콘텐츠
          const key = result.length;
          if (key < 10) {
            return;
          }
          const pageNumber: number = Math.ceil(key / 9);
          let pageTag = [];
          for (let index: number = 1; index < pageNumber + 1; index++) {
            pageTag.push(
              <p
                key={index}
                id={String(index)}
                className={styles.button_off}
                onClick={(event: MouseEvent) => {
                  setPgState(index);
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
