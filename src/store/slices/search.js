import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kassenzeichen: {},
  aenderungsAnfrage: {},
  flaechenId: null,
  frontenId: null,
  front: {},
  previousSearches: [],
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeKassenzeichen(state, action) {
      state.kassenzeichen = action.payload;
      return state;
    },
    storeAenderungsAnfrage(state, action) {
      state.aenderungsAnfrage = action.payload;
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
    storeFront(state, action) {
      state.front = action.payload;
      return state;
    },
    resetStates(state) {
      (state.front = {}), (state.frontenId = null), (state.flaechenId = null);
    },
    addSearch(state, action) {
      if (state.previousSearches.length >= 10) {
        const updatedSearches = state.previousSearches.slice(1);
        state.previousSearches = [
          ...new Set([...updatedSearches, action.payload]),
        ];
      } else {
        state.previousSearches = [
          ...new Set([...state.previousSearches, action.payload]),
        ];
      }
      return state;
    },
  },
});

export default slice;

export const {
  storeKassenzeichen,
  storeAenderungsAnfrage,
  storeFlaechenId,
  storeFrontenId,
  storeFront,
  resetStates,
  addSearch,
} = slice.actions;

export const getKassenzeichen = (state) => {
  return state.search.kassenzeichen;
};

export const getAenderungsAnfrage = (state) => {
  return state.search.aenderungsAnfrage;
};

export const getFlaechenId = (state) => {
  return state.search.flaechenId;
};

export const getFrontenId = (state) => {
  return state.search.frontenId;
};

export const getFront = (state) => {
  return state.search.front;
};

export const getPreviousSearches = (state) => {
  return state.search.previousSearches;
};
