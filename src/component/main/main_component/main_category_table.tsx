import { MouseEvent, useEffect, useState } from "react";
import styles from "./main_category_table.module.css";
import forestImage from "../../../image/forest.jpg";
import forestCartoonImage from "../../../image/forest_cartoon.jpg";
import cityImage from "../../../image/city.jpg";
import cityCartoonImage from "../../../image/city_cartoon.jpg";
import coastImage from "../../../image/coast.jpg";
import coastCartoonImage from "../../../image/coast_cartoon.jpg";

interface ctg_state {
  keyWord: string;
  keyTitle: string;
  keyImage: string;
}

export default function MainCategoryTable() {
  const [ctgState, setCtgState] = useState<ctg_state>({
    keyWord: "숲길",
    keyTitle: "산속의 향기와 함께",
    keyImage: forestImage,
  });

  const [renderSwitch, setRenderSwitch] = useState<boolean>(false);

  useEffect(() => {
    setRenderSwitch(true);
  }, [ctgState]);

  //  테이블 헤드 클릭
  const showTable = (e: MouseEvent<HTMLDivElement>) => {
    setRenderSwitch(false);
    switch (e.currentTarget.id) {
      case "forest":
        setCtgState({
          keyWord: "숲길",
          keyTitle: "산속의 향기와 함께",
          keyImage: forestImage,
        });
        break;
      case "coast":
        setCtgState({
          keyWord: "해안길",
          keyTitle: "시원한 바닷바람을 맞으며",
          keyImage: coastImage,
        });
        break;
      case "city":
        setCtgState({
          keyWord: "도심길",
          keyTitle: "도심길 타이틀",
          keyImage: cityImage,
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
          {/* 카레고리 테이블 */}
          <div className={styles.table}>
            {/* 카테고리 헤드 */}
            {/* 숲길, 해안길, 도심길 */}
            <div className={styles.table_head}>
              <div
                id="forest"
                onClick={showTable}
                style={{
                  background: `url(${forestCartoonImage})`,
                  backgroundSize: "cover",
                }}
              >
                <h4>숲길</h4>
              </div>
              <div
                id="coast"
                onClick={showTable}
                style={{
                  background: `url(${coastCartoonImage})`,
                  backgroundSize: "cover",
                }}
              >
                <h4>해안길</h4>
              </div>
              <div
                id="city"
                onClick={showTable}
                style={{
                  background: `url(${cityCartoonImage})`,
                  backgroundSize: "cover",
                }}
              >
                <h4>도심길</h4>
              </div>
            </div>
            <div
              className={styles.banner}
              style={{
                background: `url(${ctgState.keyImage}) no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
            {/* 카테고리 내용 */}
            <div className={styles.table_content}>
              <p className={styles.banner_title}>{ctgState.keyTitle}</p>
              <div>
                <div>{ctgState.keyWord}</div>
                <div>{ctgState.keyWord}</div>
                <div>{ctgState.keyWord}</div>
                <div>{ctgState.keyWord}</div>
                <div>{ctgState.keyWord}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
