import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit/react";
import authSlice from "./Auth/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat
      // categoriesApi.middleware,
      // productsApi.middleware,
      // cartApi.middleware,
      // wishlistApi.middleware,
      // authApi.middleware,
      // orderApi.middleware
      (),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
