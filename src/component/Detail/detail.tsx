import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import styles from './detail.module.css';

interface tourState {
  tourObj: Array<tourForm>;
  updateDescClass: string;
}

export default function Detail() {
  const location = useLocation() as locationType;
  const tourArr: Array<tourForm> = [];
  const [state, setState] = useState<tourState>({ tourObj: tourArr, updateDescClass: '' });
  const bannerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useSelector((state: RootState) => {
    state.tour.map((result) => tourArr.push(result));
  });

  useEffect(() => {
    let tourInfo: Array<tourForm> = [];
    tourArr.filter((content) => content.place === location.state.key).map((result) => tourInfo.push(result));
    setState({ tourObj: tourInfo, updateDescClass: tourInfo[0].description });
    if (bannerRef.current) {
      bannerRef.current.scrollIntoView();
    }
  }, [location]);

  return (
    <div className={styles.container}>
      {(() => {
        if (state) {
          return (
            <div>
              {/* 배너 */}
              <div className={styles.banner} ref={bannerRef}>
                <div style={{ backgroundImage: `url(${state.tourObj[0].mainImgNormal})`, backgroundSize: '100% 500px', opacity: 0.5 }}></div>
                <h2>{state.tourObj[0].place}</h2>
              </div>
              {/* 관광지 정보 */}
              <div className={styles.tour_content}>
                {/* 관광지 사진, 타이틀, 정보.. */}
                <div className={styles.tour_info}>
                  {/* 사진 */}
                  <div style={{ backgroundImage: `url(${state.tourObj[0].mainImgSmall})`, backgroundSize: '100% 100%' }}></div>
                  {/* 타이틀,정보 */}
                  <div>
                    <h4>타이틀</h4>
                    <p>{state.tourObj[0].title}</p>
                    <h4>카테고리</h4>
                    <p>{state.tourObj[0].category}</p>
                    {state.tourObj[0].disablePeople && (
                      <div>
                        <h4>장애인 시설 여부</h4>
                        <p>{state.tourObj[0].disablePeople}</p>{' '}
                      </div>
                    )}
                  </div>
                </div>
                {/* 교통수단 */}
                <div className={styles.tour_traffic}>
                  <h4>교통수단</h4>
                  <p>{state.tourObj[0].traffic}</p>
                </div>
                {/* 관광지 설명 */}
                <div className={styles.tour_desc}>
                  <h4>설명</h4>
                  <p ref={descRef}></p>
                </div>
                {(() => {
                  if (descRef.current !== null) {
                    descRef.current.innerHTML = state.updateDescClass;
                  } else {
                    return <div></div>;
                  }
                })()}
              </div>
            </div>
          );
        }
        return <div>ERROR!!</div>;
      })()}
    </div>
  );
}
