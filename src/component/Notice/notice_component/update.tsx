import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { noticeForm } from '../../../store/noticeSlice';
import { NoticeLocation } from './noticeDetail';
import styles from './update.module.css';

export default function Update() {

  const location = useLocation() as NoticeLocation;
  const [state,setstate] = useState<noticeForm>();

  useEffect(()=>{
    setstate(location.state.notice);
  },[location])

  return (
    <div className={styles.container}>
      {(()=>{
        if(state){
          return(
        <div className={styles.detail_table}>
        <form action="">
          {/* 제목 */}
       <input type="text" value={state.title}/>
          {/* 내용 */}
          <textarea cols={30} rows={10} value={state.content}></textarea>
          <button type='submit'>수정하기</button>
          </form>
          </div>
          );
        }
      })()}
      
    </div>
  );
}
