import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { noticeForm } from '../../store/noticeSlice';
import { RootState } from '../../store/store';
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
  const resultArr:Array<noticeForm> = useSelector((state:RootState)=>state.notice);
  const navigate = useNavigate();

  let index = 0;

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

  const showDetail = (e:MouseEvent) => {
    const index= e.currentTarget.id;
    if(index){
      
      navigate('/notice/noticeDetail',{state:{key:state,notice:resultArr[Number(index)]}})
    }
    
  }
  

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
              {resultArr.map((content)=>(
                <tr key={index++} onClick={showDetail} id={`${index}`}>
                    <td>{index+1}</td>
                    <td>{content.title}</td>
                    <td>{content.date}</td>
                    <td>{content.view}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* 게시글 등록버튼 */}
      <div>
        <Link to="/notice/post" state={{key:state}}>등록하기</Link>
      </div>
      </div>
      
      <Outlet/>
    </div>
  );
}
