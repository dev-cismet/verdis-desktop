import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kassenzeichen: "",
  flaechenId: null,
  frontenId: null,
  searchTerm: "",
};

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
    storeFrontenId(state, action) {
      state.frontenId = action.payload;
      return state;
    },
    storeSearchTerm(state, action) {
      state.searchTerm = action.payload;
      return state;
    },
  },
});

export default slice;

export const {
  storeKassenzeichen,
  storeFlaechenId,
  storeFrontenId,
  storeSearchTerm,
} = slice.actions;

export const getKassenzeichen = (state) => {
  return state.search.kassenzeichen;
};

export const getFlaechenId = (state) => {
  return state.search.flaechenId;
};

export const getFrontenId = (state) => {
  return state.search.frontenId;
};

export const getSearchTerm = (state) => {
  return state.search.searchTerm;
};
