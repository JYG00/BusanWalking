import { useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { tourForm } from '../../store/tourSlice';
import { locationType } from '../Notice/notice';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './detail.module.css';

interface tourState {
  tourObj: Array<tourForm>;
  updateDescClass: string;
}
export default function Detail() {
  const location = useLocation() as locationType;
  const tourArr: Array<tourForm> = [];
  const [state, setState] = useState<tourState>({ tourObj: tourArr, updateDescClass: '' });
  const mapRef = useRef<kakao.maps.Map>(null);
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

  // map 좌표 저장
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(state.tourObj[0].lat, state.tourObj[0].lng));
    return bounds;
  }, [state]);

  // 초기화 버튼을 누르면 원래 있던 좌표 호출
  const initalMap = () => {
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
  };

  return (
    <div className={styles.container}>
      {(() => {
        if (state) {
          return (
            <div>
              {/* 배너 */}
              <div className={styles.banner} ref={bannerRef}>
                <div style={{ backgroundImage: `url(${state.tourObj[0].mainImgNormal})`, backgroundSize: '100% 100%', opacity: 0.5 }}></div>
                <h2>{state.tourObj[0].place}</h2>
              </div>
              {/* 관광지 정보 */}
              <div className={styles.tour_content}>
                {/* 관광지 지도, 타이틀, 정보.. */}
                <div className={styles.tour_content_in}>
                  <div className={styles.tour_map}>
                    {/* 지도 */}
                    <Map center={{ lat: state.tourObj[0].lat, lng: state.tourObj[0].lng }} ref={mapRef} className={styles.map} level={2}>
                      <MapMarker position={{ lat: state.tourObj[0].lat, lng: state.tourObj[0].lng }}>
                        <div className={styles.map_mark}>{state.tourObj[0].place}</div>
                      </MapMarker>
                    </Map>
                    <button onClick={initalMap}>지도 범위 재설정 하기</button>
                    <a href={state.tourObj[0].mainImgNormal} target="_blank" rel="noreferrer">
                      이미지 새 창으로 열기
                    </a>
                  </div>
                  {/* 관광지 타이틀,정보 */}
                  <div className={styles.tour_info}>
                    <div>
                      <h4>
                        {state.tourObj[0].place}
                        <AiOutlineInfoCircle />
                      </h4>
                      <table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <th scope="row">타이틀</th>
                            <td>{state.tourObj[0].title}</td>
                          </tr>
                          <tr>
                            <th scope="row">카테고리</th>
                            <td>{state.tourObj[0].category}</td>
                          </tr>
                          <tr>
                            <th scope="row">장애인 시설 여부</th>
                            <td>{state.tourObj[0].disablePeople ? <p>{state.tourObj[0].disablePeople}</p> : <p>-</p>}</td>
                          </tr>
                          <tr>
                            <th scope="row">교통수단</th>
                            <td>{state.tourObj[0].traffic.length > 0 ? <p>{state.tourObj[0].traffic}</p> : <p>-</p>}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* 관광지 설명 */}
                <div className={styles.tour_desc}>
                  <div>
                    <h4>설명</h4>
                    <p ref={descRef}></p>
                  </div>
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
