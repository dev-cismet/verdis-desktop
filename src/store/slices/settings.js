import { createSlice } from "@reduxjs/toolkit";

const initialState = { readOnly: false };

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setReadOnly(state, action) {
      state.readOnly = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setReadOnly } = slice.actions;

export const getReadOnly = (state) => {
  return state.settings.readOnly;
};
