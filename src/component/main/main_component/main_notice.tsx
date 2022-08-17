// Main Notice Component
import styles from "./main_notice.module.css";

export default function MainNotice() {
  return (
    <div className={styles.container}>
      <div>
        {/* 명소공유 */}
        <div>
          <h2>명소공유</h2>
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>등록날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>전포동 카페거리에서 찍은 사진들</td>
                <td>2022-08-17</td>
              </tr>
              <tr>
                <td>야밤에 광안리 오션뷰</td>
                <td>2022-08-17</td>
              </tr>
              <tr>
                <td>시끌벅적 부평시장</td>
                <td>2022-08-17</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Q&A */}
        <div>
          <h2>Q&A</h2>
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>등록날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>용두산공원 장애인시설유무</td>
                <td>2022-08-17</td>
              </tr>
              <tr>
                <td>구덕운동장 이용시간</td>
                <td>2022-08-17</td>
              </tr>
              <tr>
                <td>시립미술관 휴관일</td>
                <td>2022-08-17</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
