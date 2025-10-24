import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: null,
  reducers: {
    saveNotificationSlice: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveNotificationSlice } = notificationSlice.actions;
export default notificationSlice.reducer;
