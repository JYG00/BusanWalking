import React, { MouseEvent, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styles from './quick_menu_content.module.css';

// Header > MenuContent props, state
interface MenuContentProps {
  title: string;
  content: string[];
}
interface MenuContentState {
  isDisplay: boolean;
}

// 메뉴 콘텐츠
export default function MenuContent(props: MenuContentProps) {
  let i: number = 0;
  const [state, setState] = useState<MenuContentState>({ isDisplay: false });
  const contentRef = React.createRef<HTMLDivElement>();
  // Tour-Page로 이동
  const navigate = useNavigate();
  const loadPage = (event: MouseEvent) => {
    let key = event.currentTarget.id;
    if(key === '전체관광지' || key === '숲길' || key==='해안길'||key==='도심길'){
      navigate('/tour', { state: { key: key } });
    }else if(key === '명소공유' || key==='Q&A'){
      navigate('/notice', { state: { key: key } });
    }else{
      navigate('/email',{state:{key:key}});
    }
    
  };

  useEffect(()=>{
    if (contentRef.current !== null) {
      if (state.isDisplay) {
        contentRef.current!.style.display = 'block';
      } else {
        contentRef.current!.style.display = 'none';
      }
    }
  },[state])
  

  return (
    <div className={styles.container}>
      <div>
        {/* 메뉴 이름 */}
        <div
          className={styles.head_menu_title}
          // 타이틀을 클릭하면 메뉴확장
          // 다시 누르면 축소
          onClick={() => {
            setState({ isDisplay: !state.isDisplay });
          }}
        >
          <h2>{props.title}</h2>
          <i>
            <IoIosArrowDown style={{ fill: 'white' }} />
          </i>
        </div>
        {/* 메뉴 상세 내용 */}
        <div className={styles.head_menu_sub} ref={contentRef}>
          {props.content.map((content) => (
            <div key={i++} id={content} onClick={loadPage}>
              <div></div>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
