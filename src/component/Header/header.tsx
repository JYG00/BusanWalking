import React, { Component, FormEvent, MouseEvent, ReactNode } from "react";
import styles from "./header.module.css";
import { BiSearch, BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { BiLogIn, BiLogOut, BiUserPlus } from "react-icons/bi";
import HoverContent from "./header_component/hover_content";

// 스크롤된 상태에 따라서 헤더 색깔 적용
interface HeaderProps {
  isScroll: boolean;
}
// Header state
interface HeaderState {
  isDisplay: boolean;
  width: number;
  keyWord: string;
  isLogin: boolean;
  offsetY: number;
  headColor: string;
  headShadow: string;
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
    offsetY: 0,
    keyWord: "",
    headColor: "transparent",
    headShadow: "none",
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
  componentDidUpdate(prevProps: HeaderProps, prevState: HeaderState): void {
    if (this.props.isScroll !== prevProps.isScroll) {
      // 마우스 커서 여부에 따라 스타일 적용
      if (this.props.isScroll) {
        // state의 keyword는 hover 여부를 나타냅니다
        // state의 keyword가 공백이면 hover 상태
        if (this.state.keyWord === "") {
          this.setState({
            ...this.state,
            headColor: "white",
            headShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          });
        }
      } else {
        if (this.state.keyWord === "") {
          this.setState({
            ...this.state,
            headColor: "transparent",
            headShadow: "none",
          });
        }
      }
    }
  }

  render(): ReactNode {
    // useRef
    const menuRef = React.createRef<HTMLDivElement>();
    const headRef = React.createRef<HTMLDivElement>();
    const searchRef = React.createRef<HTMLDivElement>();

    // 퀵메뉴 아이콘 클릭 시
    const onClick = () => {
      this.setState({ isDisplay: !this.state.isDisplay });
    };

    // 마우스를 올리면 NavHover 메뉴 표시
    const showNavHover = (event: MouseEvent<HTMLDivElement>) => {
      this.setState({
        ...this.state,
        headColor: "white",
        headShadow: "rgba(0, 0, 0, 0.8) 0 0 0 9999px",
        keyWord: event.currentTarget.id,
      });
    };

    // 영역 밖으로 나가면 NavHover 숨김
    const hideNavHover = (event: MouseEvent<HTMLDivElement>) => {
      if (this.props.isScroll) {
        this.setState({
          ...this.state,
          headColor: "white",
          headShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          keyWord: "",
        });
      } else {
        this.setState({
          ...this.state,
          headColor: "transparent",
          headShadow: "none",
          keyWord: "",
        });
      }
    };

    return (
      <div
        className={styles.head}
        ref={headRef}
        style={{
          backgroundColor: this.state.headColor,
          boxShadow: this.state.headShadow,
        }}
      >
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
                <FiPlus style={{ transform: "rotate(45deg)" }} />
              </button>
            </div>
          </div>
        </div>
        {/* 헤더상단 */}
        {!this.props.isScroll && this.state.width > 1015 && (
          <div className={styles.head_in_top} onMouseEnter={hideNavHover}>
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
        )}
        <div className={styles.head_in}>
          {/* 메뉴 아이콘 1015px 이하만 적용 */}
          <div className={styles.head_menu} onClick={onClick}>
            <BiMenu />
          </div>
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
              <div
                onMouseEnter={showNavHover}
                onMouseLeave={hideNavHover}
                id="관광지"
              >
                <p>관광지</p>
                <HoverContent keyWord="관광지" isScroll={this.props.isScroll} />
              </div>
              {/* 참여마당 */}
              <div
                onMouseEnter={showNavHover}
                onMouseLeave={hideNavHover}
                id="참여마당"
              >
                <p>참여마당</p>
                <HoverContent
                  keyWord="참여마당"
                  isScroll={this.props.isScroll}
                />
              </div>
              {/* 문의 */}
              <div
                onMouseEnter={showNavHover}
                onMouseLeave={hideNavHover}
                id="문의"
              >
                <p>문의</p>
                <HoverContent keyWord="문의" isScroll={this.props.isScroll} />
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

        {/* 메뉴 아이콘 클릭 시 */}
        {/* 메뉴 설정 (1015px 이하)*/}
        {this.state.width < 1015 && this.state.isDisplay && (
          <div>
            <div className={styles.head_menu_content} ref={menuRef}>
              {this.state.isLogin ? (
                <div className={styles.icon_bar}>
                  {/* 닫기 아이콘 */}
                  <div onClick={onClick}>
                    <FiPlus style={{ transform: "rotate(45deg)" }} />
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
                    <FiPlus style={{ transform: "rotate(45deg)" }} />
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
              <IoIosArrowDown style={{ fill: "white" }} />
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
