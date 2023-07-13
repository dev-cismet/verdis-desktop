import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
console.log("store initializing ....");

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
