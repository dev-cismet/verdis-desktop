import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import searchSlice from "./slices/search";
import settingsSlice from "./slices/settings";
console.log("store initializing ....");

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    settings: settingsSlice.reducer,
  },
});
