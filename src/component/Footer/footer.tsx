import styles from "./footer.module.css";
import { BiCopyright } from "react-icons/bi";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { MouseEvent, useState } from "react";

const IconStyle = {
  cursor: "pointer",
  padding: "20px 20px 20px 20px",
  margin: "5px 5px 0 5px",
  borderRadius: "40px",
  backgroundColor: "#f3f3f3",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  opacity: "0.8",
};
// 아이콘 투명도 설정
interface IconState {
  youtube: string;
  facebook: string;
  instagram: string;
}

export default function Footer() {
  const [iconState, setIconState] = useState<IconState>({
    facebook: "0.8",
    instagram: "0.8",
    youtube: "0.8",
  });

  const mouseOver = (e: MouseEvent) => {
    switch (e.currentTarget.getAttribute("values")) {
      case "youtube":
        setIconState({ facebook: "0.8", instagram: "0.8", youtube: "1" });
        break;
      case "instagram":
        setIconState({ facebook: "0.8", instagram: "1", youtube: "0.8" });
        break;
      case "facebook":
        setIconState({ facebook: "1", instagram: "0.8", youtube: "0.8" });
        break;
      default:
        setIconState({ facebook: "0.8", instagram: "0.8", youtube: "0.8" });
        break;
    }
  };

  const mouseLeave = () => {
    setIconState({ facebook: "0.8", instagram: "0.8", youtube: "0.8" });
  };
  return (
    <div className={styles.container}>
      <div>
        {/* 로고 */}
        <div className={styles.logo}>로고</div>
        {/* 기타 */}
        <div className={styles.company_desc}>
          {/* 회사 주소 */}
          <div className={styles.company_address}>
            <p>회사 주소 : 부산광역시...</p>
          </div>
          {/* 이메일 주소 / 대표 전화 / FAX */}
          <div className={styles.company_email}>
            <p>이메일 주소 : usbdsu@naver.com</p>
            <p>대표 전화 : 000-0000-0000</p>
            <p>FAX : 051-000-0000</p>
          </div>
          {/* 저작권 */}
          <div className={styles.company_copyright}>
            <p>
              COPYRIGHT <BiCopyright /> BUSANWALKING ALL RIGHT REVERSED
            </p>
          </div>
          {/* SNS 아이콘 */}
          <div className={styles.company_sns}>
            {/* 인스타 */}
            <FaInstagram
              style={{
                ...IconStyle,
                opacity: iconState.instagram,
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                fill: "white",
              }}
              size={30}
              values="instagram"
              onMouseEnter={mouseOver}
              onMouseLeave={mouseLeave}
            />
            {/* 페북 */}
            <FaFacebookF
              style={{
                ...IconStyle,
                opacity: iconState.facebook,
                backgroundColor: "#4267B2",
                fill: "white",
              }}
              size={30}
              values="facebook"
              onMouseEnter={mouseOver}
              onMouseLeave={mouseLeave}
            />
            {/* 유튜브 */}
            <FaYoutube
              style={{
                ...IconStyle,
                opacity: iconState.youtube,
                backgroundColor: "white",
                fill: "#ff0000",
              }}
              values="youtube"
              onMouseEnter={mouseOver}
              onMouseLeave={mouseLeave}
              size={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
