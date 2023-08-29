import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: "63701cc1f03239b7f700000e" };

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
});

// export const {} = userInfoSlice.actions;
export default userInfoSlice.reducer;
