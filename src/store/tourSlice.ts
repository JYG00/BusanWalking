import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface tourState {
  mainImgNormal: string;
  mainImgSmall: string;
  place: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  traffic: string;
  disablePeople?: string;
}

const initalState: Array<tourState> = [
  {
    mainImgNormal: '',
    mainImgSmall: '',
    place: '',
    title: '',
    subTitle: '',
    description: '',
    category: '',
    traffic: '',
  },
];

export const tourSlice = createSlice({
  name: 'tour',
  initialState: initalState,
  reducers: {
    ADD: (state: Array<tourState>, action: PayloadAction<Array<tourState>>) => {
      // 값이 두번 들어가는 것을 방지하기 위함
      if (state.length > 1) {
        return;
      } else {
        action.payload.map((content) => state.push(content));
        state.splice(0, 1);
      }
    },
    LOAD: (state) => {
      return state;
    },
  },
});
export const { ADD, LOAD } = tourSlice.actions;

export const selectTour = (state: tourState) => state;

export default tourSlice.reducer;
