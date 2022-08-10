import React, {
  Component,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "./main.module.css";

interface SlideProps {
  color: string;
  mainImg: string;
  title: string;
  place: string;
  traffic: string;
  description: string;
}

interface SlideState {}

export default function Main() {
  const [SlideIdx, setSlideIdx] = useState<number>(1);
  const SlideRef = useRef<null | HTMLDivElement[]>([]);

  useEffect(() => {
    if (SlideRef.current !== null) {
      // zIndex 값 초기화
      SlideRef.current.map((elem) => {
        elem.style.zIndex = "0";
        elem.style.opacity = "0";
      });
    }
  }, []);

  useEffect(() => {
    if (SlideRef.current !== null) {
      // 해당되는 슬라이드 zIndex 변경
      SlideRef.current[SlideIdx].style.zIndex = "2";
      SlideRef.current[SlideIdx].style.opacity = "1";
      SlideRef.current[SlideIdx].style.transition = "all 2s ease-in-out";

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
        elem.style.zIndex = "0";
        elem.style.opacity = "0";
      });

      // action에 따라서 state 변경
      if (action === "plus") {
        setSlideIdx(SlideIdx + 1);
      } else if (action === "minus") {
        setSlideIdx(SlideIdx - 1);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 파트 : 메인 carousel */}
      <div className={styles.main_top}>
        {/* 슬라이드 컨트롤 아이콘 */}
        <div
          className={styles.slide_controller_minus}
          onClick={(e) => {
            moveSlide(e, "minus");
          }}
        >
          <IoIosArrowBack />
        </div>
        <div
          className={styles.slide_controller_plus}
          onClick={(e) => {
            moveSlide(e, "plus");
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
          <SlideImg
            color="red"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[1] = elem;
            }
          }}
          className={styles.slide_on}
        >
          <SlideImg
            color="green"
            description="부산 서구 동대신동에 위치한 작은 마을이 있습니다. 어쩌고 저쩌고 ..."
            place="닥밭골 행복마을"
            traffic=""
            mainImg=""
            title="도심속 작은마을"
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[2] = elem;
            }
          }}
        >
          <SlideImg
            color="yellow"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[3] = elem;
            }
          }}
        >
          <SlideImg
            color="purple"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[4] = elem;
            }
          }}
        >
          <SlideImg
            color="orange"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[5] = elem;
            }
          }}
        >
          <SlideImg
            color="red"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
        <div
          ref={(elem: HTMLDivElement) => {
            if (SlideRef.current !== null) {
              SlideRef.current[6] = elem;
            }
          }}
          className={styles.slide_on}
        >
          <SlideImg
            color="green"
            description=""
            place=""
            traffic=""
            mainImg=""
            title=""
          />
        </div>
      </div>
      {/* 중간 파트 : 카테고리 table */}
      <div className={styles.main_mid}>2</div>
      {/* 하단 파트 : notice  */}
      <div className={styles.main_bottom}>3</div>
    </div>
  );
}

class SlideImg extends Component<SlideProps, SlideState> {
  render(): ReactNode {
    return (
      <div
        className={styles.slide}
        style={{ backgroundColor: this.props.color }}
      >
        <div>
          <div className={styles.slide_left}>
            {/* 관광지 타이틀 */}
            <div className={styles.slide_tour_title}>
              <h4>{this.props.title}</h4>
            </div>
            {/* 관광지 명 */}
            <div className={styles.slide_tour_place}>
              <h2>{this.props.place}</h2>
            </div>
            {/* 관광지 설명 */}
            <div className={styles.slide_tour_desc}>
              <p>{this.props.description}</p>
            </div>
          </div>
          <div className={styles.slide_right}>
            {/* 관광지 사진 */}
            <div className={styles.slide_tour_img}>
              <div>img</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
