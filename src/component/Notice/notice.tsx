import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImageCover } from '../Cover/imageCover';
import styles from './notice.module.css';

export interface locationType {
  state: {
    key: string;
  };
}

export default function Notice() {
  const location = useLocation() as locationType;
  const [state, setState] = useState<string>(location.state.key);
  const [pgState, setPgState] = useState<number>(1);
  const contentHeadRef = useRef<null | HTMLParagraphElement[]>([]);
  const pageButtonRef = useRef<null | HTMLParagraphElement[]>([]);
  const result = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k'];

  const changeContent = (event: MouseEvent) => {
    const tableHead = event.currentTarget.getAttribute('id');

    if (tableHead === null) {
      alert('typeError');
    } else {
      setState(tableHead);
    }
  };

  // location 호출 시 setState
  useEffect(() => {
    setState(location.state.key);
  }, [location]);

  useEffect(() => {
    if (contentHeadRef.current !== null) {
      contentHeadRef.current.map((content) => content !== null && (content.className = `${styles.table_head_off}`));
      switch (state) {
        case '명소공유':
          contentHeadRef.current[0].className = `${styles.table_head_on}`;
          break;
        case 'Q&A':
          contentHeadRef.current[1].className = `${styles.table_head_on}`;
          break;
        default:
          break;
      }
    }
  }, [state]);

  return (
    <div className={styles.container}>
      {/* 슬로건 바 */}
      <div className={styles.slogan_bar}>
        <ImageCover src={`${process.env.PUBLIC_URL}/image/notice-cartoon.jpg`} alt={'banner-Image'} />
        <h2>{state}</h2>
      </div>
      <div className={styles.table_head}>
        <p
          id="명소공유"
          onClick={changeContent}
          ref={(elem: HTMLParagraphElement) => {
            if (contentHeadRef.current !== null) {
              contentHeadRef.current[0] = elem;
            }
          }}
        >
          명소공유
        </p>
        <p
          id="Q&A"
          onClick={changeContent}
          ref={(elem: HTMLParagraphElement) => {
            if (contentHeadRef.current !== null) {
              contentHeadRef.current[1] = elem;
            }
          }}
        >
          Q&A
        </p>
      </div>
      {/* 게시판 */}
      <div className={styles.notice_table}>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let noticeTag = [];
              for (let index = 0; index < result.length; index++) {
                noticeTag.push(
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{result[index]}</td>
                    <td>{result[index]}</td>
                    <td>{result[index]}</td>
                  </tr>,
                );
              }
              return noticeTag;
            })()}
          </tbody>
        </table>
      </div>
      {/* 게시글 등록버튼 */}
      <div>
        <Link to="/post">등록하기</Link>
      </div>
      {/* 페이지 버튼  */}
      <div className={styles.page_button}>
        {(() => {
          // 한페이지에 9개 콘텐츠
          const key = result.length;
          if (key < 10) {
            return;
          }
          const pageNumber: number = Math.ceil(key / 9);
          let pageTag = [];
          for (let index: number = 1; index < pageNumber + 1; index++) {
            pageTag.push(
              <p
                key={index}
                id={String(index)}
                className={index === 1 ? styles.button_on : styles.button_off}
                onClick={(event: MouseEvent) => {
                  setPgState(index);
                }}
                ref={(elem: HTMLParagraphElement) => {
                  if (pageButtonRef.current !== null) {
                    pageButtonRef.current[index] = elem;
                  }
                }}
              >
                {index}
              </p>,
            );
          }
          return pageTag;
        })()}
      </div>
    </div>
  );
}
