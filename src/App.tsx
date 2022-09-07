import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header/header';
import Main from './component/Main/main';
import Footer from './component/Footer/footer';
import Tour from './component/Tour/tour';
import Detail from './component/Detail/detail';
import Search from './component/Search/search';
import Notice from './component/Notice/notice';
import SendEmail from './component/Email/email';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { ADD, tourForm } from './store/tourSlice';
import { useDispatch } from 'react-redux';

interface AppState {
  isRender: boolean;
}

function App() {
  const [state, setState] = useState<AppState>({
    isRender: false,
  });

  const dispatch = useDispatch();

  const getData = async () => {
    let tourResultArr: Array<tourForm> = [];
    await axios
      .get(
        '//apis.data.go.kr/6260000/WalkingService/getWalkingKr?serviceKey=hGeBuMFhtkE6bZ%2F2wNlO2vAP6MQevzRFM0I3Zz3ILWTCbLbTHuNHDKtwOwcOENS%2FvJknwdmrLYTYH8pNbyhWzA%3D%3D&numOfRows=37&pageNo=1&resultType=json',
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) =>
        res.data.getWalkingKr.item.map((content: any) => {
          tourResultArr.push({
            mainImgNormal: content.MAIN_IMG_NORMAL,
            mainImgSmall: content.MAIN_IMG_THUMB,
            disablePeople: content.MIDDLE_SIZE_RM1,
            place: content.PLACE,
            title: content.TITLE,
            subTitle: content.SUBTITLE,
            description: content.ITEMCNTNTS,
            category: content.CATE2_NM,
            traffic: content.TRFC_INFO,
            lat: content.LAT,
            lng: content.LNG,
          });
        }),
      )
      .then(() => {
        dispatch(ADD(tourResultArr));
        setState({ ...state, isRender: true });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {state.isRender && (
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="tour" element={<Tour />} />
            <Route path="notice" element={<Notice />} />
            <Route path="search" element={<Search />} />
            <Route path="detail" element={<Detail />} />
            <Route path="email" element={<SendEmail />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
