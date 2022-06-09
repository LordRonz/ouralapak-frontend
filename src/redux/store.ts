import { configureStore } from '@reduxjs/toolkit';

import creatorSlice from '@/redux/features/creatorSlice';
import productSlice from '@/redux/features/productSlice';
// import AuthProvider from '../hooks/useFirebase';

export const store = configureStore({
  reducer: {
    products: productSlice,
    creators: creatorSlice,
    // auth:AuthProvider(),
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
