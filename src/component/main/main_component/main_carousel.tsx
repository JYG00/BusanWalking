// Main Carousel Component
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { tourState } from '../../../store/tourSlice';
import styles from './main_carousel.module.css';

interface SlideProps {
  mainImgNormal: string;
  mainImgSmall: string;
  mainTitle: string;
  subTitle: string;
  place: string;
}

interface SlideState {
  rotateIcon: string;
}

export default function MainCarousel() {
  const [SlideIdx, setSlideIdx] = useState<number>(1);
  const SlideRef = useRef<null | HTMLDivElement[]>([]);
  let tourArr: Array<tourState> = [
    {
      mainImgNormal: '',
      mainImgSmall: '',
      place: '',
      title: '',
      subTitle: '',
      description: '',
      category: '',
      traffic: '',
    },
  ];

  useSelector((state: RootState) => {
    state.map((content) => tourArr.push(content));
    tourArr.splice(0, 1);
    console.log();
  });

  useEffect(() => {
    if (SlideRef.current !== null) {
      // zIndex 값 초기화
      SlideRef.current.map((elem) => {
        elem.style.zIndex = '0';
        elem.style.opacity = '0';
      });
    }
  }, []);

  useEffect(() => {
    if (SlideRef.current !== null) {
      // 해당되는 슬라이드 zIndex 변경
      for (let i = 0; i < SlideRef.current.length; i++) {
        if (SlideRef.current[i] === SlideRef.current[SlideIdx]) {
          SlideRef.current[SlideIdx].style.zIndex = '2';
          SlideRef.current[SlideIdx].style.opacity = '1';
          SlideRef.current[SlideIdx].style.transition = 'all 2s ease-in-out';
        }
      }

      // index 범위 검사
      switch (SlideIdx) {
        case 0:
          setSlideIdx(5);
          break;
        case 6:
          setSlideIdx(1);
          break;
        default:
          break;
      }
    }
  }, [SlideIdx]);

  const moveSlide = (e: MouseEvent<HTMLDivElement>, action: string) => {
    if (SlideRef.current !== null) {
      // zIndex 값 초기화
      SlideRef.current.map((elem) => {
        elem.style.zIndex = '0';
        elem.style.opacity = '0';
      });

      // action에 따라서 state 변경
      if (action === 'plus') {
        setSlideIdx(SlideIdx + 1);
      } else if (action === 'minus') {
        setSlideIdx(SlideIdx - 1);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 파트 : 메인 carousel */}
      {tourArr.length === 37 && (
        <div className={styles.main_carousel}>
          {/* 슬라이드 컨트롤 아이콘 */}
          <div
            className={styles.slide_controller_minus}
            onClick={(e) => {
              moveSlide(e, 'minus');
            }}
          >
            <IoIosArrowBack />
          </div>
          <div
            className={styles.slide_controller_plus}
            onClick={(e) => {
              moveSlide(e, 'plus');
            }}
          >
            <IoIosArrowForward />
          </div>
          {/* 5개의 슬라이드로 구성 */}
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[0] = elem;
              }
            }}
          >
            <SlideImg subTitle={tourArr[14].description} place={tourArr[14].place} mainImgNormal={tourArr[14].mainImgNormal} mainImgSmall={tourArr[14].mainImgSmall} mainTitle={tourArr[14].subTitle} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[1] = elem;
              }
            }}
            className={styles.slide_on}
          >
            <SlideImg subTitle={tourArr[0].description} place={tourArr[0].place} mainImgNormal={tourArr[0].mainImgNormal} mainImgSmall={tourArr[0].mainImgSmall} mainTitle={tourArr[0].subTitle} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[2] = elem;
              }
            }}
          >
            <SlideImg subTitle={tourArr[7].description} place={tourArr[7].place} mainImgNormal={tourArr[7].mainImgNormal} mainImgSmall={tourArr[7].mainImgSmall} mainTitle={tourArr[7].subTitle} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[3] = elem;
              }
            }}
          >
            <SlideImg subTitle={tourArr[30].description} place={tourArr[30].place} mainImgNormal={tourArr[30].mainImgNormal} mainImgSmall={tourArr[30].mainImgSmall} mainTitle={tourArr[30].subTitle} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[4] = elem;
              }
            }}
          >
            <SlideImg subTitle={tourArr[16].description} place={tourArr[16].place} mainImgNormal={tourArr[16].mainImgNormal} mainImgSmall={tourArr[16].mainImgSmall} mainTitle={tourArr[16].subTitle} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[5] = elem;
              }
            }}
          >
            <SlideImg subTitle={tourArr[14].description} place={tourArr[14].place} mainImgNormal={tourArr[14].mainImgNormal} mainTitle={tourArr[14].subTitle} mainImgSmall={tourArr[14].mainImgSmall} />
          </div>
          <div
            ref={(elem: HTMLDivElement) => {
              if (SlideRef.current !== null) {
                SlideRef.current[6] = elem;
              }
            }}
            className={styles.slide_on}
          >
            <SlideImg subTitle={tourArr[0].description} place={tourArr[0].place} mainImgNormal={tourArr[0].mainImgNormal} mainImgSmall={tourArr[0].mainImgSmall} mainTitle={tourArr[0].subTitle} />
          </div>
        </div>
      )}
    </div>
  );
}

function SlideImg(props: SlideProps) {
  const [state, setState] = useState<SlideState>({ rotateIcon: 'rotate(0deg)' });
  const navigation = useNavigate();
  let subTitleArr: string = props.subTitle.split('<')[0];

  const initialIcon = () => {
    setState({ rotateIcon: 'rotate(0deg)' });
  };

  const rotateIcon = () => {
    setState({ rotateIcon: 'rotate(90deg)' });
  };

  const showDetail = () => {
    navigation('/detail', { state: { key: props.place } });
  };

  return (
    <div className={styles.slide}>
      <div style={{ width: '100%', height: '100%', backgroundImage: `url(${props.mainImgNormal})`, backgroundSize: 'cover', position: 'absolute', zIndex: -1, opacity: 0.3 }}></div>
      <div>
        <div className={styles.slide_left}>
          {/* 관광지 타이틀 */}
          <div className={styles.slide_tour_title}>
            <h4>{props.mainTitle}</h4>
          </div>
          {/* 관광지 명 */}
          <div className={styles.slide_tour_place}>
            <h2>{props.place}</h2>
          </div>
          {/* 관광지 설명 */}
          <div className={styles.slide_tour_desc}>{subTitleArr.length > 0 && <p>{subTitleArr}</p>}</div>
        </div>
        <div className={styles.slide_right}>
          {/* 관광지 사진 */}
          <div className={styles.slide_tour_img}>
            <div style={{ backgroundImage: `url(${props.mainImgSmall})`, backgroundSize: 'cover' }}></div>
            {/* 더보기 아이콘 */}
            <div className={styles.slide_plus_icon} onMouseEnter={rotateIcon} onMouseLeave={initialIcon} onClick={showDetail}>
              <FiPlus
                size={34}
                style={{
                  transform: state.rotateIcon,
                  transition: 'transform 0.3s ease-in',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
