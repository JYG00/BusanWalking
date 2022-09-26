import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './tourSlice';
import noticeReducer from './noticeSlice';
export const store = configureStore({ reducer: { tour: tourReducer, notice: noticeReducer } });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
