import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface noticeForm {
  title:string;
  date:string;
  content:string;
  user:string;
  view:number;
}

const initalState: Array<noticeForm> = [{
  title:'test Title',
  date:'2000-01-01',
  content:'Hello World!!',
  user:'dev001',
  view:0}
  ]
;

export const noticeSlice = createSlice({
  name: 'notice',
  initialState: initalState,
  reducers: {
    loadNoticeData: (state: Array<noticeForm>, action: PayloadAction<Array<noticeForm>>) => {
      // 값이 두번 들어가는 것을 방지하기 위함
      if (state.length > 1) {
        return;
      } else {
        action.payload.map((content) => state.push(content));
        state.splice(0, 1);
      }
    },
}});
export const { loadNoticeData } = noticeSlice.actions;

export const selectNotice = (state: noticeForm) => state;

export default noticeSlice.reducer;
