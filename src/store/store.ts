import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './tourSlice';
import scrollReducer from './scrollSlice';
export const store = configureStore({ reducer: { tour: tourReducer, scroll: scrollReducer } });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
