import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import userInfoSlice from "./slices/userInfo";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    uiState: uiSlice,
    userState: userInfoSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;
