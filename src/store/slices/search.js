import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kassenzeichen: {},
  aenderungsAnfrage: {},
  flaechenId: null,
  frontenId: null,
  front: {},
  flaeche: {},
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
    storeFlaeche(state, action) {
      state.flaeche = action.payload;
      return state;
    },
    resetStates(state) {
      (state.front = {}),
        (state.frontenId = null),
        (state.flaeche = {}),
        (state.flaechenId = null);
    },
    addSearch(state, action) {
      if (state.previousSearches.length >= 8) {
        const updatedSearches = state.previousSearches.slice(
          0,
          state.previousSearches.length - 1
        );
        state.previousSearches = [
          ...new Set([action.payload, ...updatedSearches]),
        ];
      } else {
        state.previousSearches = [
          ...new Set([action.payload, ...state.previousSearches]),
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
  storeFlaeche,
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

export const getFlaeche = (state) => {
  return state.search.flaeche;
};

export const getPreviousSearches = (state) => {
  return state.search.previousSearches;
};
