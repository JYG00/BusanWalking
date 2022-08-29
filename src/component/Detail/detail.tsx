import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import styles from './detail.module.css';

interface tourState {
  tourObj: Array<tourForm>;
}

export default function Detail() {
  const location = useLocation() as locationType;
  const tourArr: Array<tourForm> = [];
  const [state, setState] = useState<tourState>();
  const descRef = useRef<HTMLParagraphElement>(null);

  useSelector((state: RootState) => {
    state.tour.map((result) => tourArr.push(result));
  });

  useEffect(() => {
    let tourInfo: Array<tourForm> = [];
    tourArr.filter((content) => content.place === location.state.key).map((result) => tourInfo.push(result));
    setState({ tourObj: tourInfo });
  }, [location]);

  return (
    <div className={styles.container}>
      {(() => {
        if (state !== undefined) {
          console.log(state.tourObj[0].disablePeople);
          return (
            <div>
              {/* 배너 */}
              <div className={styles.banner}>
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
                    <p>{state.tourObj[0].title}</p>
                    {state.tourObj[0].disablePeople && <p>장애인 시설 여부 : {state.tourObj[0].disablePeople}</p>}
                  </div>
                </div>
                {/* 교통수단 */}
                <div className={styles.tour_traffic}>
                  <h2>교통수단</h2>
                  <p>{state.tourObj[0].traffic}</p>
                </div>
                {/* 관광지 설명 */}
                <div className={styles.tour_desc}>
                  <p ref={descRef}></p>
                  {(descRef.current!.innerHTML = state.tourObj[0].description)}
                </div>
              </div>
            </div>
          );
        }
        return <div>ERROR!!</div>;
      })()}
    </div>
  );
}
