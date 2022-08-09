import React, { Component, FormEvent, MouseEvent, ReactNode } from "react";
import styles from "./header.module.css";
import { BiSearch, BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { BiLogIn, BiLogOut, BiUserPlus } from "react-icons/bi";

// Header props, state
interface HeaderProps {}
interface HeaderState {
  isDisplay: boolean;
  width: number;
  keyWord: string;
  isLogin: boolean;
}
// Header > MenuContent props, state
interface MenuContentProps {
  title: string;
  content: string[];
}
interface MenuContentState {
  isDisplay: boolean;
}

// 헤더
class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    isDisplay: false,
    isLogin: false,
    width: window.innerWidth,
    keyWord: "",
  };

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
    if (this.state.width > 1015) {
      this.setState({ isDisplay: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    return () => window.removeEventListener("resize", this.updateDimensions);
  }

  render(): ReactNode {
    const navHoverRef = React.createRef<HTMLDivElement>();
    const menuRef = React.createRef<HTMLDivElement>();
    const headRef = React.createRef<HTMLDivElement>();
    const searchRef = React.createRef<HTMLDivElement>();

    // 퀵메뉴 아이콘 클릭 시
    const onClick = () => {
      this.setState({ isDisplay: !this.state.isDisplay });
    };

    // 마우스를 올리면 NavHover 메뉴 표시
    const showNavHover = (event: MouseEvent<HTMLDivElement>) => {
      if (navHoverRef.current !== null && headRef.current !== null) {
        navHoverRef.current.style.display = "flex";
        headRef.current.style.boxShadow = "rgba(0, 0, 0, 0.8) 0 0 0 9999px";
        headRef.current.style.zIndex = "100";
        this.setState({ ...this.state, keyWord: event.currentTarget.id });
      }
    };

    // 영역 밖으로 나가면 NavHover 숨김
    const hideNavHover = (event: MouseEvent<HTMLDivElement>) => {
      if (navHoverRef.current !== null && headRef.current !== null) {
        navHoverRef.current.style.display = "none";
        headRef.current.style.boxShadow = "none";
        headRef.current.style.zIndex = "0";
        this.setState({ ...this.state, keyWord: event.currentTarget.id });
      }
    };

    return (
      <div className={styles.head} ref={headRef}>
        {/* 검색 */}
        <div className={styles.head_search} ref={searchRef}>
          <div>
            <div>
              <form
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  console.log("hello");
                }}
              >
                <input
                  type="text"
                  placeholder="검색할 내용을 입력해주세요. (예:부산 서구"
                />
                <button type="submit">
                  <BiSearch />
                </button>
              </form>
            </div>
            {/* 닫기 아이콘 */}
            <div
              onClick={() => {
                if (searchRef.current !== null) {
                  searchRef.current.style.display = "none";
                  searchRef.current.style.boxShadow = "none";
                  searchRef.current.style.zIndex = "-1";
                }
              }}
            >
              <button className={styles.search_icon}>
                <ImCross />
              </button>
            </div>
          </div>
        </div>
        {/* 헤더상단 */}
        <div className={styles.head_in_top} onMouseEnter={hideNavHover}>
          {/* 메뉴 아이콘 1015px 이하만 적용 */}
          <div className={styles.head_menu} onClick={onClick}>
            <BiMenu />
          </div>
          {/* 헤더 상단 콘텐츠 */}
          <div className={styles.head_content_top}>
            {this.state.isLogin ? (
              <div className={styles.head_content_in_top_loginOut}>
                <div>
                  <p>로그아웃</p>
                </div>
              </div>
            ) : (
              <div className={styles.head_content_in_top_login}>
                {/* 로그인 */}
                <div>
                  <p>로그인</p>
                </div>
                {/* 회원가입 */}
                <div>
                  <p>회원가입</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.head_in}>
          {/* 로고 */}
          <div
            className={styles.head_logo}
            onMouseEnter={hideNavHover}
            id="logo"
          >
            로고
          </div>
          {/* 헤더 컨텐츠 */}
          <div className={styles.head_content}>
            <div className={styles.head_content_in}>
              {/* 관광지 */}
              <div onMouseEnter={showNavHover} id="관광지">
                <p>관광지</p>
              </div>
              {/* 참여마당 */}
              <div onMouseEnter={showNavHover} id="참여마당">
                <p>참여마당</p>
              </div>
              {/* 문의 */}
              <div onMouseEnter={showNavHover} id="문의">
                <p>문의</p>
              </div>
              {/* 검색 */}
              <div
                style={{ cursor: "pointer" }}
                onMouseEnter={hideNavHover}
                onClick={() => {
                  if (searchRef.current !== null) {
                    searchRef.current.style.display = "block";
                    searchRef.current.style.boxShadow =
                      "rgba(0, 0, 0, 0.8) 0 0 0 9999px";
                    searchRef.current.style.zIndex = "100";
                  }
                }}
              >
                <p>
                  검색
                  <BiSearch style={{ marginLeft: "3px" }} />
                </p>
              </div>
            </div>
          </div>
        </div>
        {this.state.width > 1015 && (
          <div
            className={styles.head_in_hover}
            ref={navHoverRef}
            onMouseLeave={hideNavHover}
          >
            {/* 크기를 맞추기 위한 빈 태그 */}
            <div className={styles.head_logo_hover}>{this.state.keyWord}</div>
            {/* 헤더 hover 컨텐츠 */}
            <div className={styles.head_content_hover}>
              <div className={styles.head_content_in_hover}>
                {(() => {
                  switch (this.state.keyWord) {
                    case "관광지": {
                      return (
                        <div className={styles.head_hover_container}>
                          <div className={styles.head_hover_on}>
                            <div></div>
                            <p>전체관광지</p>
                          </div>
                          <div>
                            <div></div>
                            <p>숲길</p>
                          </div>
                          <div>
                            <div></div>
                            <p>해안길</p>
                          </div>
                          <div>
                            <div></div>
                            <p>도심길</p>
                          </div>
                        </div>
                      );
                    }
                    case "참여마당": {
                      return (
                        <div className={styles.head_hover_container}>
                          <div>
                            <div></div>
                            <p>명소공유</p>
                          </div>
                          <div className={styles.head_hover_on}>
                            <div></div>
                            <p>Q&A</p>
                          </div>
                        </div>
                      );
                    }
                    case "문의": {
                      return (
                        <div className={styles.head_hover_container}>
                          <div>
                            <div></div>
                            <p>이용문의</p>
                          </div>
                          <div>
                            <div></div>
                            <p>관광불편신고</p>
                          </div>
                          <div className={styles.head_hover_on}>
                            <div style={{ opacity: 0 }}></div>
                            <p style={{ opacity: 0 }}>..</p>
                          </div>
                        </div>
                      );
                    }
                    default: {
                      return <div></div>;
                    }
                  }
                })()}
              </div>
            </div>
          </div>
        )}
        {/* 메뉴 아이콘 클릭 시 */}
        {/* 메뉴 설정 (850px 이하)*/}
        {this.state.width < 1015 && this.state.isDisplay && (
          <div>
            <div className={styles.head_menu_content} ref={menuRef}>
              {this.state.isLogin ? (
                <div className={styles.icon_bar}>
                  {/* 닫기 아이콘 */}
                  <div onClick={onClick}>
                    <ImCross />
                    <p>메뉴 닫기</p>
                  </div>
                  {/* 로그아웃 아이콘 */}
                  <div>
                    <BiLogOut />
                    <p>로그아웃</p>
                  </div>
                </div>
              ) : (
                <div className={styles.icon_bar}>
                  {/* 닫기 아이콘 */}
                  <div onClick={onClick}>
                    <ImCross />
                    <p>메뉴 닫기</p>
                  </div>
                  {/* 로그인 아이콘 */}
                  <div>
                    <BiLogIn />
                    <p>로그인</p>
                  </div>
                  {/* 회원가입 아이콘 */}
                  <div>
                    <BiUserPlus />
                    <p>회원가입</p>
                  </div>
                </div>
              )}

              <div>
                {/* 관광지 */}
                <MenuContent
                  title="관광지"
                  content={["전체관광지", "숲길", "해안길", "도심길"]}
                />
                {/* 참여마당 */}
                <MenuContent title="참여마당" content={["명소공유", "Q&A"]} />
                {/* 문의 */}
                <MenuContent
                  title="문의"
                  content={["이용문의", "관광불편신고"]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// 메뉴 콘텐츠
class MenuContent extends Component<MenuContentProps, MenuContentState> {
  constructor(props: MenuContentProps) {
    super(props);
    this.state = {
      isDisplay: true,
    };
  }

  render() {
    let i: number;
    i = 0;

    const contentRef = React.createRef<HTMLDivElement>();

    return (
      <div>
        <div>
          {/* 메뉴 이름 */}
          <div
            className={styles.head_menu_title}
            // 타이틀을 클릭하면 메뉴확장
            // 다시 누르면 축소
            onClick={() => {
              if (contentRef.current !== null) {
                if (this.state.isDisplay) {
                  contentRef.current!.style.display = "block";
                } else {
                  contentRef.current!.style.display = "none";
                }
                this.setState({ isDisplay: !this.state.isDisplay });
              }
            }}
          >
            <h2>{this.props.title}</h2>
            <i>
              <IoIosArrowDown style={{ position: "relative", top: "5px" }} />
            </i>
          </div>
          {/* 메뉴 상세 내용 */}
          <div className={styles.head_menu_sub} ref={contentRef}>
            {this.props.content.map((content) => (
              <div key={i++}>
                <div></div>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
