import MainCarousel from "./main_component/main_carousel";
import styles from "./main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      {/* 상단 파트 : 메인 케로셀 */}
      <MainCarousel />
      {/* 중간 파트 : 카테고리 테이블 */}
      <div className={styles.main_mid}>2</div>
      {/* 하단 파트 : 게시판  */}
      <div className={styles.main_bottom}>3</div>
    </div>
  );
}
