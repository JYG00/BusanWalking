// Main Category Table Component
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { tourForm } from '../../../store/tourSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ImageCover } from '../../Cover/imageCover';
// style
import styles from './main_category_table.module.css';
import { BiCategory } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

interface ctg_state {
  keyword: string;
  title: string;
  contentArr: Array<tourForm>;
  ctgStyle: ctg_style;
}
interface ctg_style {
  background: string;
}

// 카테고리에 따라 다른 스타일 적용
const forestStyle: ctg_style = {
  background: 'linear-gradient(to right, #45b649, #dce35b)',
};
const coastStyle: ctg_style = {
  background: 'linear-gradient(to right, #6190e8, #a7bfe8)',
};
const cityStyle: ctg_style = {
  background: 'linear-gradient(to right, #4568dc, #b06ab3)',
};

export default function MainCategoryTable() {
  // 여행지 정보를 담을 배열
  let tourArr: Array<tourForm> = [];
  // 초기값은 숲길 카테고리
  let initalArr: Array<tourForm> = [];

  const navigate = useNavigate();

  // 데이터를 가져오고 초기값 설정
  useSelector((state: RootState) => {
    state.tour.map((content) => tourArr.push(content));
    tourArr.filter((content) => content.category.includes('숲길')).map((result) => initalArr.push(result));
  });

  const [state, setstate] = useState<ctg_state>({
    keyword: '숲길',
    title: '숲길 타이틀',
    contentArr: initalArr,
    ctgStyle: forestStyle,
  });

  const [renderSwitch, setRenderSwitch] = useState<number>(0);
  const categoryRef = useRef<HTMLDivElement>(null);

  //  카테고리 클릭 시
  const showTable = (e: MouseEvent<HTMLDivElement>) => {
    setRenderSwitch(0);
    switch (e.currentTarget.id) {
      case 'forest':
        let forestArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('숲길')).map((result) => forestArr.push(result));
        setstate({
          keyword: '숲길',
          title: '숲길 타이틀',
          contentArr: forestArr,
          ctgStyle: forestStyle,
        });
        break;
      case 'coast':
        let coastArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('해안길')).map((result) => coastArr.push(result));
        setstate({
          keyword: '해안길',
          title: '해안길 타이틀',
          contentArr: coastArr,
          ctgStyle: coastStyle,
        });
        break;
      case 'city':
        let cityArr: Array<tourForm> = [];
        tourArr.filter((content) => content.category.includes('도심길')).map((result) => cityArr.push(result));
        setstate({
          keyword: '도심길',
          title: '도심길 타이틀',
          contentArr: cityArr,
          ctgStyle: cityStyle,
        });
        break;
      default:
        break;
    }
  };

  const showDetail = (e: MouseEvent) => {
    navigate('/detail', { state: { key: e.currentTarget.id } });
  };

  useEffect(() => {
    setRenderSwitch(0);
  }, []);

  useEffect(() => {
    if (state.contentArr.length > 0) {
      console.log('hi');
      setRenderSwitch(1);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      {/* 중간 파트 : 메인 카테고리 테이블 */}
      {/* 배너 */}
      <div>
        <div className={styles.banner}>
          <ImageCover src={`${process.env.PUBLIC_URL}/image/together_cartoon.jpg`} alt={'main-table-banner'} />
        </div>
        {/* 카레고리 테이블 */}
        <div className={styles.table}>
          {/* 카테고리 헤드 */}
          {/* 숲길, 해안길, 도심길 */}
          <div>
            <div className={styles.category}>
              <div className={styles.category_button}>
                <BiCategory size={50} />
              </div>
              <div className={styles.table_head} ref={categoryRef}>
                <div id="forest" onClick={showTable} style={forestStyle}>
                  <h4>숲길</h4>
                </div>
                <div id="coast" onClick={showTable} style={coastStyle}>
                  <h4>해안길</h4>
                </div>
                <div id="city" onClick={showTable} style={cityStyle}>
                  <h4>도심길</h4>
                </div>
              </div>
            </div>
          </div>
          {/* 카테고리 내용 */}
          <div className={styles.table_content}>
            <p className={styles.banner_title}>{state.title}</p>
            <p className={styles.banner_keyword}>{state.keyword}</p>
            <div className={styles.content}>
              {state.contentArr
                .filter((content) => state.contentArr.indexOf(content) < 5)
                .map((result) => (
                  <div key={result.place} style={{ background: state.ctgStyle.background }}>
                    <div style={{ backgroundImage: `url(${result.mainImgSmall})`, backgroundSize: 'cover' }}>
                      {/* hover */}
                      <div className={styles.hover_content}>
                        <div style={{ background: state.ctgStyle.background }}></div>
                        <div>
                          <p id={result.place} onClick={showDetail}>
                            자세히 보기
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>{result.place}</p>
                    <p id={result.place} className={styles.mobile_button} onClick={showDetail}>
                      <FiPlus size={24} />
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
