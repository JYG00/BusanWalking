import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface tourForm {
  mainImgNormal: string;
  mainImgSmall: string;
  place: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  traffic: string;
  lat: number;
  lng: number;
  disablePeople?: string;
}

const initalState: Array<tourForm> = [
  {
    mainImgNormal: '',
    mainImgSmall: '',
    place: '',
    title: '',
    subTitle: '',
    description: '',
    category: '',
    traffic: '',
    lat: 0,
    lng: 0,
  },
];

export const tourSlice = createSlice({
  name: 'tour',
  initialState: initalState,
  reducers: {
    ADD: (state: Array<tourForm>, action: PayloadAction<Array<tourForm>>) => {
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

export const selectTour = (state: tourForm) => state;

export default tourSlice.reducer;
