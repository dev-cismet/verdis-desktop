import { createSlice } from "@reduxjs/toolkit";

const initialState = { kassenzeichen: "", flaechenId: null };

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeKassenzeichen(state, action) {
      state.kassenzeichen = action.payload;
      return state;
    },
    storeFlaechenId(state, action) {
      state.flaechenId = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeKassenzeichen, storeFlaechenId } = slice.actions;

export const getKassenzeichen = (state) => {
  return state.search.kassenzeichen;
};

export const getFlaechenId = (state) => {
  return state.search.flaechenId;
};
