import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { noticeForm } from '../../../store/noticeSlice';
import styles from './noticeDetail.module.css';

export interface NoticeLocation{
  state : {
    notice:noticeForm
  }
}

export default function NoticeDetail() {

  const [state,setState] = useState<noticeForm>();
  const location = useLocation() as NoticeLocation;

  useEffect(()=>{
    setState(location.state.notice)
    console.log(location.state.notice)
  },[location])

  return (
    <div className={styles.container}>
     {(()=>{
      if(state){
        return(<div className={styles.detail_table}>
          {/* 제목 */}
          <div>제목 : {state.title}</div>
          {/* 작성자 */}
          <div>작성자 : {state.user}</div>
          {/* 작성일자 */}
          <div>작성일자: {state.date}</div>
          {/* 내용 */}
          <div>내용 : {state.content}</div>
          </div>)
      }else{
        return(<div>ERROR!</div>)
      }
     })()}
     <button><Link to="/notice/update" state={{notice:state}}>수정하기</Link></button>
      <button>삭제하기</button>
    </div>
  );
}
