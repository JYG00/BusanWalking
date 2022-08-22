import React, { MouseEvent, useState } from 'react';
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
  const [state, setState] = useState<MenuContentState>({ isDisplay: true });

  const navigate = useNavigate();

  const loadTourPage = (event: MouseEvent) => {
    navigate('/tour', { state: { key: event.currentTarget.id } });
  };

  let i: number;
  i = 0;

  const contentRef = React.createRef<HTMLDivElement>();

  return (
    <div className={styles.container}>
      <div>
        {/* 메뉴 이름 */}
        <div
          className={styles.head_menu_title}
          // 타이틀을 클릭하면 메뉴확장
          // 다시 누르면 축소
          onClick={() => {
            if (contentRef.current !== null) {
              if (state.isDisplay) {
                contentRef.current!.style.display = 'block';
              } else {
                contentRef.current!.style.display = 'none';
              }
              setState({ isDisplay: !state.isDisplay });
            }
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
            <div key={i++} id={content} onClick={loadTourPage}>
              <div></div>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
