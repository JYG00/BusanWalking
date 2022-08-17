import MainCarousel from "./main_component/main_carousel";
import MainCategoryTable from "./main_component/main_category_table";
import MainNotice from "./main_component/main_notice";
import styles from "./main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      {/* 상단 파트 : 메인 케로셀 */}
      <MainCarousel />
      {/* 중간 파트 : 카테고리 테이블 */}
      <MainCategoryTable />
      {/* 하단 파트 : 게시판  */}
      <MainNotice />
    </div>
  );
}
