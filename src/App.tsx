import React, { Component, useRef } from "react";
import "./App.css";
import { BiSearch, BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}

interface MenuContentProps {
  title: string;
  content: string[];
  isOn: boolean;
}

// 헤더
class Header extends Component {
  render() {
    return (
      <div className="head">
        {/* 헤더상단 */}
        <div className="head_in_top">
          {/* 헤더 상단 콘텐츠 */}
          <div className="head_content_top">
            <div className="head_content_in_top">
              {/* 로그인 */}
              <div>
                <p>로그인</p>
              </div>
              {/* 회원가입 */}
              <div>
                <p>회원가입</p>
              </div>
            </div>
          </div>
        </div>
        <div className="head_in">
          {/* 메뉴 아이콘 850px 이하만 적용 */}
          <div className="head_menu">
            <BiMenu />
          </div>
          {/* 로고 */}
          <div className="head_logo">로고</div>
          {/* 헤더 컨텐츠 */}
          <div className="head_content">
            <div className="head_content_in">
              {/* 관광지 */}
              <div>
                <p>관광지</p>
              </div>
              {/* 참여마당 */}
              <div>
                <p>참여마당</p>
              </div>
              {/* 문의 */}
              <div>
                <p>문의</p>
              </div>
              {/* 검색 */}
              <div style={{ cursor: "pointer" }}>
                <p>
                  검색
                  <BiSearch style={{ marginLeft: "3px" }} />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 헤더에 커서를 올렸을때 메뉴확장 */}
        <div className="head_in_hover">
          {/* 크기를 맞추기 위한 빈 태그 */}
          <div className="head_logo_hover"></div>
          {/* 헤더 hover 컨텐츠 */}
          <div className="head_content_hover">
            <div className="head_content_in_hover">
              {/* 관광지 hover*/}
              <div>
                <p>전체관광지</p>
                <p>숲길</p>
                <p>해안길</p>
                <p>도심길</p>
              </div>
              {/* 참여마당 hover*/}
              <div>
                <p>명소공유</p>
                <p>Q&A</p>
              </div>
              {/* 문의 */}
              <div>
                <p>이용문의</p>
                <p>관광불편신고</p>
              </div>
              {/* 크기를 맞추기 위한 빈 태그 */}
              <div></div>
            </div>
          </div>
        </div>
        {/* 메뉴 설정 (850px 이하)*/}
        <div className="head_menu_content">
          {/* 관광지 */}
          <MenuContent
            title="관광지"
            content={["전체관광지", "숲길", "해안길", "도심길"]}
            isOn={false}
          />
          {/* 참여마당 */}
          <MenuContent
            title="참여마당"
            content={["명소공유", "Q&A"]}
            isOn={false}
          />
          {/* 문의 */}
          <MenuContent
            title="문의"
            content={["이용문의", "관광불편신고"]}
            isOn={false}
          />
        </div>
      </div>
    );
  }
}

// 메뉴 콘텐츠
function MenuContent(props: MenuContentProps) {
  let i: number;
  i = 0;

  const ulRef = useRef<HTMLUListElement>(null);

  return (
    <div>
      <div>
        {/* 메뉴 이름 */}
        <div
          className="head_menu_title"
          onClick={() => {
            ulRef.current.style.display = "block";
          }}
        >
          <p>
            {props.title}
            <IoIosArrowDown />
          </p>
        </div>
        {/* 메뉴 상세 내용 */}
        <ul className="head_menu_sub" ref={ulRef}>
          {props.content.map((content) => (
            <li key={i++}>{content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
