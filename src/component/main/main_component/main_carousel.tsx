// Main Carousel Component
import React, {
  Component,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "./main_carousel.module.css";

interface SlideProps {
  color: string;
  mainImg: string;
  title: string;
  place: string;
  traffic: string;
  description: string;
}

interface SlideState {
  rotateIcon: string;
}

export default function MainCarousel() {
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
            description="부산 중구 보수동에 위치한..."
            place="용두산공원"
            traffic=""
            mainImg=""
            title="용처럼 솟아오른 탑"
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
            description="부산 중구 자갈치에 위치한..."
            place="자갈치 시장"
            traffic=""
            mainImg=""
            title="수산물과 함께하는 거리"
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
            description="광안리를 따라 해안길을..."
            place="광안리 산책코스 A-C"
            traffic=""
            mainImg=""
            title="바다의 향기를 담아"
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
            description="부산 사하구 감천동에 위치한 이 마을은 ..."
            place="감천문화마을"
            traffic=""
            mainImg=""
            title="산복도로에 있는 옹지종기 모여있는 마을"
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
            description="부산 중구 보수동에 위치한..."
            place="용두산공원"
            traffic=""
            mainImg=""
            title="용처럼 솟아오른 탑"
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
            description="부산 서구 동대신동에 위치한 작은 마을이 있습니다. 어쩌고 저쩌고 ..."
            place="닥밭골 행복마을"
            traffic=""
            mainImg=""
            title="도심속 작은마을"
          />
        </div>
      </div>
    </div>
  );
}

class SlideImg extends Component<SlideProps, SlideState> {
  state = {
    rotateIcon: "rotate(0deg)",
  };

  render(): ReactNode {
    const initialIcon = () => {
      this.setState({ rotateIcon: "rotate(0deg)" });
    };

    const rotateIcon = () => {
      this.setState({ rotateIcon: "rotate(90deg)" });
    };

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
              <div></div>
              {/* 더보기 아이콘 */}
              <div
                className={styles.slide_plus_icon}
                onMouseEnter={rotateIcon}
                onMouseLeave={initialIcon}
              >
                <FiPlus
                  size={34}
                  style={{
                    transform: this.state.rotateIcon,
                    transition: "transform 0.3s ease-in",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
