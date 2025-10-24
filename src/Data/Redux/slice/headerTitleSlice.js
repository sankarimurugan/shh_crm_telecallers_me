import { createSlice } from "@reduxjs/toolkit";

const headerTitleSlice = createSlice({
  name: "headerTitleSlice",
  initialState: null,
  reducers: {
    saveHeaderTitleSlice: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveHeaderTitleSlice } = headerTitleSlice.actions;
export default headerTitleSlice.reducer;
