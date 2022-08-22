import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './hover_content.module.css';

interface HoverContentProps {
  keyWord: string;
  isScroll: boolean;
  isHover: boolean;
}

interface HoverContentState {
  positionTop: string;
}

// Hover Content
export default function HoverContent(props: HoverContentProps) {
  const [state, setState] = useState<HoverContentState>({
    positionTop: '140px',
  });

  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isScroll) {
      setState({ positionTop: '100px' });
    } else {
      setState({ positionTop: '140px' });
    }
  }, [props.isScroll]);

  useEffect(() => {
    if (props.isHover) {
      if (hoverRef.current !== null) {
        hoverRef.current.style.display = 'flex';
      }
    } else {
      if (hoverRef.current !== null) {
        hoverRef.current.style.display = 'none';
      }
    }
  }, [props.isHover]);

  // Key와 함께 Tour-Page 로 이동
  const navigate = useNavigate();

  const loadTourPage = (e: MouseEvent) => {
    navigate('/tour', { state: { key: e.currentTarget.id } });
  };
  // Key와 함께 Notice-Page 로 이동
  const loadNoticePage = (e: MouseEvent) => {
    navigate('/notice', { state: { key: e.currentTarget.id } });
  };
  // Key와 함께 Email-Page 로 이동
  const loadEmailPage = (e:MouseEvent) => {
    navigate('/email', { state: { key: e.currentTarget.id } });
  }

  return (
    <div className={styles.head_in_hover} style={{ top: state.positionTop }} ref={hoverRef}>
      {/* 크기를 맞추기 위한 빈 태그 */}
      <div className={styles.head_logo_hover}>{props.keyWord}</div>
      {/* 헤더 hover 컨텐츠 */}
      <div className={styles.head_content_hover}>
        <div className={styles.head_content_in_hover}>
          {(() => {
            switch (props.keyWord) {
              case '관광지': {
                return (
                  <div className={styles.head_hover_container}>
                    <div className={styles.head_hover_on} onClick={loadTourPage} id={'전체관광지'}>
                      <div></div>
                      <p>전체관광지</p>
                    </div>
                    <div onClick={loadTourPage} id={'숲길'}>
                      <div></div>
                      <p>숲길</p>
                    </div>
                    <div onClick={loadTourPage} id={'해안길'}>
                      <div></div>
                      <p>해안길</p>
                    </div>
                    <div onClick={loadTourPage} id={'도심길'}>
                      <div></div>
                      <p>도심길</p>
                    </div>
                  </div>
                );
              }
              case '참여마당': {
                return (
                  <div className={styles.head_hover_container}>
                    <div onClick={loadNoticePage} id={'명소공유'}>
                      <div></div>
                      <p>명소공유</p>
                    </div>
                    <div className={styles.head_hover_on} onClick={loadNoticePage} id={'Q&A'}>
                      <div></div>
                      <p>Q&A</p>
                    </div>
                  </div>
                );
              }
              case '문의': {
                return (
                  <div className={styles.head_hover_container}>
                    <div onClick={loadEmailPage} id="이용문의">
                      <div></div>
                      <p>이용문의</p>
                    </div>
                    <div onClick={loadEmailPage} id="관광불편신고">
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
  );
}
