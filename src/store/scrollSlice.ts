import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface scrollState {
  isScroll: boolean;
}

const initalState: scrollState = {
  isScroll: false,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState: initalState,
  reducers: {
    SCROLL: (state: scrollState, action: PayloadAction<boolean>) => {
      state = { isScroll: action.payload };
    },
  },
});
export const { SCROLL } = scrollSlice.actions;

export const selectScroll = (state: scrollState) => state;

export default scrollSlice.reducer;
