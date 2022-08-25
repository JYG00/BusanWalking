// Main Category Table Component
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { tourForm } from '../../../store/tourSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
// style
import styles from './main_category_table.module.css';
import forestCartoonImage from '../../../image/forest_cartoon.jpg';
import cityCartoonImage from '../../../image/city_cartoon.jpg';
import coastCartoonImage from '../../../image/coast_cartoon.jpg';
import { BiCategory } from 'react-icons/bi';

interface ctg_state {
  keyword: string;
  title: string;
  contentArr: Array<tourForm>;
}

export default function MainCategoryTable() {
  // 여행지 정보를 담을 배열
  let tourArr: Array<tourForm> = [];
  // 초기값은 숲길 카테고리
  let initalArr: Array<tourForm> = [];

  // 데이터를 가져오고 초기값 설정
  useSelector((state: RootState) => {
    state.tour.map((content) => tourArr.push(content));
    tourArr.filter((content) => content.category.includes('숲길')).map((result) => initalArr.push(result));
  });

  const [ctgState, setCtgState] = useState<ctg_state>({
    keyword: '숲길',
    title: '숲길 타이틀',
    contentArr: initalArr,
  });

  const [renderSwitch, setRenderSwitch] = useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRenderSwitch(true);
  }, [ctgState]);

  const showCategory = () => {
    if (categoryRef.current !== null) {
      if (categoryRef.current.style.display === 'flex') {
        categoryRef.current.style.display = 'none';
      } else {
        categoryRef.current.style.display = 'flex';
      }
    }
  };

  //  테이블 헤드 클릭
  const showTable = (e: MouseEvent<HTMLDivElement>) => {
    setRenderSwitch(false);
    switch (e.currentTarget.id) {
      case 'forest':
        let forestArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('숲길')).map((result) => forestArr.push(result));
        setCtgState({
          keyword: '숲길',
          title: '숲길 타이틀',
          contentArr: forestArr,
        });
        break;
      case 'coast':
        let coastArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('해안길')).map((result) => coastArr.push(result));
        setCtgState({
          keyword: '해안길',
          title: '해안길 타이틀',
          contentArr: coastArr,
        });
        break;
      case 'city':
        let cityArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('도심길')).map((result) => cityArr.push(result));
        setCtgState({
          keyword: '도심길',
          title: '도심길 타이틀',
          contentArr: cityArr,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {/* 중간 파트 : 메인 카테고리 테이블 */}
      {/* 배너 */}
      {renderSwitch && (
        <div>
          <div className={styles.banner}></div>
          {/* 카레고리 테이블 */}
          <div className={styles.table}>
            {/* 카테고리 헤드 */}
            {/* 숲길, 해안길, 도심길 */}
            <div>
              <div className={styles.category}>
                <div className={styles.category_button} onClick={showCategory}>
                  <BiCategory size={50} />
                </div>
                <div className={styles.table_head} ref={categoryRef}>
                  <div id="forest" onClick={showTable}>
                    <img src={forestCartoonImage} alt="ForestIcon" />
                    <h4>숲길</h4>
                  </div>
                  <div id="coast" onClick={showTable}>
                    <img src={coastCartoonImage} alt="CoastIcon" />
                    <h4>해안길</h4>
                  </div>
                  <div id="city" onClick={showTable}>
                    <img src={cityCartoonImage} alt="CityIcon" />
                    <h4>도심길</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* 카테고리 내용 */}
            <div className={styles.table_content}>
              <p className={styles.banner_title}>{ctgState.title}</p>
              <p className={styles.banner_keyword}>{ctgState.keyword}</p>
              <div className={styles.content}>
                <div style={{ backgroundImage: `url(${ctgState.contentArr[0].mainImgSmall})`, backgroundSize: 'cover' }}>
                  <p>{ctgState.contentArr[0].place}</p>
                </div>
                <div style={{ backgroundImage: `url(${ctgState.contentArr[1].mainImgSmall})`, backgroundSize: 'cover' }}>
                  <p>{ctgState.contentArr[1].place}</p>
                </div>
                <div style={{ backgroundImage: `url(${ctgState.contentArr[2].mainImgSmall})`, backgroundSize: 'cover' }}>
                  <p>{ctgState.contentArr[2].place}</p>
                </div>
                <div style={{ backgroundImage: `url(${ctgState.contentArr[3].mainImgSmall})`, backgroundSize: 'cover' }}>
                  <p>{ctgState.contentArr[3].place}</p>
                </div>
                <div style={{ backgroundImage: `url(${ctgState.contentArr[4].mainImgSmall})`, backgroundSize: 'cover' }}>
                  <p>{ctgState.contentArr[4].place}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
