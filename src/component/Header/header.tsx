import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import { BiSearch, BiMenu, BiLogIn, BiLogOut, BiUserPlus } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import HoverContent from './header_component/hover_content';
import MenuContent from './header_component/quick_menu_content';
import SearchForm from './header_component/search_form';

// Header state
interface HeaderState {
  isQuickDisplay: boolean;
  isHover: boolean;
  isSearch: number;
  scrollY: number;
  width: number;
  keyWord: string;
  isLogin: boolean;
  offsetY: number;
  headColor: string;
  headShadow: string;
}

// 헤더
function Header() {
  const [state, setState] = useState<HeaderState>({
    isQuickDisplay: false,
    isLogin: false,
    isHover: false,
    scrollY: 0,
    isSearch: 0,
    width: window.innerWidth,
    offsetY: 0,
    keyWord: '',
    headColor: 'transparent',
    headShadow: 'none',
  });

  const updateDimensions = () => {
    setState({ ...state, width: window.innerWidth });
  };

  const updateScroll = () => {
    if (window.scrollY > 0) {
      setState({ ...state, scrollY: window.scrollY });
    } else {
      setState({ ...state, scrollY: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  // 스크롤 상태에 따라서 헤더 스타일 적용
  useEffect(() => {
    // 마우스 커서 여부에 따라 스타일 적용
    if (state.scrollY > 0) {
      // state의 keyword는 hover 여부를 나타냅니다
      // state의 keyword가 공백이면 hover 상태
      if (state.keyWord === '') {
        setState({
          ...state,
          headColor: 'white',
          headShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        });
      }
    } else {
      if (state.keyWord === '') {
        setState({
          ...state,
          headColor: 'transparent',
          headShadow: 'none',
        });
      }
    }
  }, [state.scrollY]);

  const location = useLocation();

  // 스크린의 넓이에 따라서
  // 경로 변경 시 호버 창 또는 퀵 창을 닫습니다
  useEffect(() => {
    if (state.width > 1015) {
      hideNavHover();
    } else {
      // 스크린 넓이가 1015px 이하일 때
      // 메뉴창이 켜져있다면 메뉴창을 끕니다
      if (menuRef.current) {
        callQuickMenu();
      }
    }
  }, [location]);

  useEffect(() => {
    if (state.isQuickDisplay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [state.isQuickDisplay]);
  // useRef
  const menuRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // 퀵메뉴 아이콘 클릭 시
  const callQuickMenu = () => {
    setState({ ...state, isQuickDisplay: !state.isQuickDisplay });
  };

  // 마우스를 올리면 NavHover 메뉴 표시
  const showNavHover = (event: MouseEvent<HTMLDivElement>) => {
    // on-modal : 스크롤 제어
    document.body.style.overflow = 'hidden';
    setState({
      ...state,
      headColor: 'white',
      headShadow: 'rgba(0, 0, 0, 0.8) 0 0 0 9999px',
      keyWord: event.currentTarget.id,
      isHover: true,
    });
  };

  // 영역 밖으로 나가면 NavHover 숨김
  const hideNavHover = () => {
    // off-modal : 스크롤 허용
    document.body.style.overflow = 'auto';
    if (state.scrollY) {
      setState({
        ...state,
        headColor: 'white',
        headShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        keyWord: '',
        isHover: false,
      });
    } else {
      setState({
        ...state,
        headColor: 'transparent',
        headShadow: 'none',
        keyWord: '',
        isHover: false,
      });
    }
  };

  return (
    <div
      className={styles.head}
      ref={headRef}
      style={{
        backgroundColor: state.headColor,
        boxShadow: state.headShadow,
      }}
    >
      {/* 검색 */}
      <SearchForm isDisplay={state.isSearch} />
      {/* 헤더상단 */}
      {state.scrollY === 0 && state.width > 1015 && (
        <div className={styles.head_in_top} onMouseEnter={hideNavHover}>
          {/* 헤더 상단 콘텐츠 */}
          <div className={styles.head_content_top}>
            {state.isLogin ? (
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
        <div className={styles.head_menu} onClick={callQuickMenu}>
          <BiMenu />
        </div>
        {/* 로고 */}
        <div className={styles.head_logo} onMouseEnter={hideNavHover} id="logo">
          <Link to="/" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/logo.png)` }}></Link>
        </div>
        {/* 헤더 컨텐츠 */}
        <div className={styles.head_content}>
          <div className={styles.head_content_in}>
            {/* 관광지 */}
            <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="관광지">
              <Link to="/tour" state={{ key: '전체관광지' }}>
                <p>관광지</p>
              </Link>
              {state.keyWord === '관광지' && <HoverContent keyWord={state.keyWord} scrollY={state.scrollY} isHover={state.isHover} />}
            </div>
            {/* 참여마당 */}
            <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="참여마당">
              <Link to="notice" state={{ key: '이용문의' }}>
                <p>참여마당</p>
              </Link>
              {state.keyWord === '참여마당' && <HoverContent keyWord={state.keyWord} scrollY={state.scrollY} isHover={state.isHover} />}
            </div>
            {/* 문의 */}
            <div onMouseEnter={showNavHover} onMouseLeave={hideNavHover} id="문의">
              <p>문의</p>
              {state.keyWord === '문의' && <HoverContent keyWord={state.keyWord} scrollY={state.scrollY} isHover={state.isHover} />}
            </div>
            {/* 검색 */}
            <div style={{ cursor: 'pointer' }} onMouseEnter={hideNavHover} onClick={() => setState({ ...state, isSearch: state.isSearch + 1 })}>
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
      {state.width < 1015 && state.isQuickDisplay && (
        <div style={{ width: '400px', height: '9999px' }}>
          <div className={styles.head_menu_content} ref={menuRef}>
            {state.isLogin ? (
              <div className={styles.icon_bar}>
                {/* 닫기 아이콘 */}
                <div onClick={callQuickMenu}>
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
                <div onClick={callQuickMenu}>
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

export default Header;
