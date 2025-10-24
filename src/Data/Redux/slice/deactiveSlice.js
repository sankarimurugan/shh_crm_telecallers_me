import { createSlice } from "@reduxjs/toolkit";

const deactiveSlice = createSlice({
  name: "deactiveSlice",
  initialState: false,
  reducers: {
    saveDeactiveSlice: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveDeactiveSlice } = deactiveSlice.actions;
export default deactiveSlice.reducer;
