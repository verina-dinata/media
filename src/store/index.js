import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from "./apis/albumsApi";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer // [] doesn't create a new array. Go and look up te reducer pah property & whatever the string is, put a new key inside of that [] object. [albumsApi.reducerPath] => albums
    // to avoid mispelling string
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware);
  }
});


setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser'
export { useFetchAlbumsQuery, useAddAlbumMutation } from './apis/albumsApi';
