import { isRejectedWithValue } from "@reduxjs/toolkit";
import { saveDeactiveSlice } from "../Redux/slice/deactiveSlice";
 
export const rtkQueryErrorLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const token = localStorage.getItem("token");
    if (isRejectedWithValue(action)) {
      if (
        action?.payload?.data?.message ===
          "Your account has been deactivated. Please contact admin." &&
        token
      ) {
        dispatch(saveDeactiveSlice(true));
      } else {
        dispatch(saveDeactiveSlice(false));
      }
      console.log("errorLogger.js:", action);
    }

    return next(action);
  };
