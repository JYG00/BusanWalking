import React, { Component, FormEvent, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { BiSearch, BiMenu, BiLogIn, BiLogOut, BiUserPlus } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import HoverContent from './header_component/hover_content';
import MenuContent from './header_component/menu_content';
import SearchForm from './header_component/search_form';

// 스크롤된 상태에 따라서 헤더 색깔 적용
interface HeaderProps {
  isScroll: boolean;
}
// Header state
interface HeaderState {
  isDisplay: boolean;
  isSearch: number;
  width: number;
  keyWord: string;
  isLogin: boolean;
  offsetY: number;
  headColor: string;
  headShadow: string;
}

// 헤더
class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    isDisplay: false,
    isLogin: false,
    isSearch: 0,
    width: window.innerWidth,
    offsetY: 0,
    keyWord: '',
    headColor: 'transparent',
    headShadow: 'none',
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
    if (this.state.width > 1015) {
      this.setState({ isDisplay: false });
    }
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    return () => window.removeEventListener('resize', this.updateDimensions);
  }
  componentDidUpdate(prevProps: HeaderProps, prevState: HeaderState): void {
    if (this.props.isScroll !== prevProps.isScroll) {
      // 마우스 커서 여부에 따라 스타일 적용
      if (this.props.isScroll) {
        // state의 keyword는 hover 여부를 나타냅니다
        // state의 keyword가 공백이면 hover 상태
        if (this.state.keyWord === '') {
          this.setState({
            ...this.state,
            headColor: 'white',
            headShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          });
        }
      } else {
        if (this.state.keyWord === '') {
          this.setState({
            ...this.state,
            headColor: 'transparent',
            headShadow: 'none',
          });
        }
      }
    }
  }
  render(): ReactNode {
    // useRef
    const menuRef = React.createRef<HTMLDivElement>();
    const headRef = React.createRef<HTMLDivElement>();
    // 퀵메뉴 아이콘 클릭 시
    const onClick = () => {
      this.setState({ isDisplay: !this.state.isDisplay });
    };
    // 마우스를 올리면 NavHover 메뉴 표시
    const showNavHover = (event: MouseEvent<HTMLDivElement>) => {
      this.setState({
        ...this.state,
        headColor: 'white',
        headShadow: 'rgba(0, 0, 0, 0.8) 0 0 0 9999px',
        keyWord: event.currentTarget.id,
      });
    };
    // 영역 밖으로 나가면 NavHover 숨김
    const hideNavHover = (event: MouseEvent<HTMLDivElement>) => {
      if (this.props.isScroll) {
        this.setState({
          ...this.state,
          headColor: 'white',
          headShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          keyWord: '',
        });
      } else {
        this.setState({
          ...this.state,
          headColor: 'transparent',
          headShadow: 'none',
          keyWord: '',
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
        <SearchForm isDisplay={this.state.isSearch} />

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
          <div className={styles.head_logo} onMouseEnter={hideNavHover} id="logo">
            <Link to="/" style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
              로고
            </Link>
          </div>
          {/* 헤더 컨텐츠 */}
          <div className={styles.head_content}>
            <div className={styles.head_content_in}>
              {/* 관광지 */}
              <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="관광지">
                <Link to="/tour">
                  <p>관광지</p>
                </Link>
                <HoverContent keyWord="관광지" isScroll={this.props.isScroll} />
              </div>
              {/* 참여마당 */}
              <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="참여마당">
                <Link to="notice">
                  <p>참여마당</p>
                </Link>
                <HoverContent keyWord="참여마당" isScroll={this.props.isScroll} />
              </div>
              {/* 문의 */}
              <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="문의">
                <p>문의</p>
                <HoverContent keyWord="문의" isScroll={this.props.isScroll} />
              </div>
              {/* 검색 */}
              <div style={{ cursor: 'pointer' }} onMouseEnter={hideNavHover} onClick={() => this.setState({ ...this.state, isSearch: this.state.isSearch + 1 })}>
                <p>
                  검색
                  <BiSearch style={{ marginLeft: '3px' }} />
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
                    <FiPlus style={{ transform: 'rotate(45deg)' }} />
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
                    <FiPlus style={{ transform: 'rotate(45deg)' }} />
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
                <MenuContent title="관광지" content={['전체관광지', '숲길', '해안길', '도심길']} />
                {/* 참여마당 */}
                <MenuContent title="참여마당" content={['명소공유', 'Q&A']} />
                {/* 문의 */}
                <MenuContent title="문의" content={['이용문의', '관광불편신고']} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Header;
