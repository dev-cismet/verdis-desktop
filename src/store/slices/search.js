import { createSlice } from "@reduxjs/toolkit";

const initialState = { kassenzeichen: "" };

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeKassenzeichen(state, action) {
      state.kassenzeichen = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeKassenzeichen } = slice.actions;

export const getKassenzeichen = (state) => {
  return state.search.kassenzeichen;
};
