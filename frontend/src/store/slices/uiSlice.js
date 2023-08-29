import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "dark" };

const uiSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state) {
      state.mode === "dark" ? (state.mode = "light") : (state.mode = "dark");
    },
  },
});

export const { setMode } = uiSlice.actions;
export default uiSlice.reducer;
