import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flaechenCollection: undefined,
  frontenCollection: undefined,
  generalGeometryCollection: undefined,
  befreiungErlaubnisCollection: undefined,
};

const slice = createSlice({
  name: "mapping",
  initialState,
  reducers: {
    setFlaechenCollection(state, action) {
      state.flaechenCollection = action.payload;
      return state;
    },
    setFrontenCollection(state, action) {
      state.frontenCollection = action.payload;
      return state;
    },
    setGeneralGeometryCollection(state, action) {
      state.generalGeometryCollection = action.payload;
      return state;
    },
    setGeneralGeometrySelected(state, action) {
      const { id } = action.payload;
      state.generalGeometryCollection.forEach((item) => {
        item.selected = false;
      });

      const selectedObject = state.generalGeometryCollection.find(
        (item) => item.properties.id === id
      );
      if (selectedObject) {
        selectedObject.selected = true;
      }
      return state;
    },
    setFlaechenSelected(state, action) {
      const { id } = action.payload;
      state.flaechenCollection.forEach((item) => {
        item.selected = false;
      });

      const selectedObject = state.flaechenCollection.find(
        (item) => item.properties.id === `flaeche.${id}`
      );
      if (selectedObject) {
        selectedObject.selected = true;
      }
      return state;
    },
    setFrontenSelected(state, action) {
      const { id } = action.payload;
      state.frontenCollection.forEach((item) => {
        item.selected = false;
      });

      const selectedObject = state.frontenCollection.find(
        (item) => item.properties.id === id
      );
      if (selectedObject) {
        selectedObject.selected = true;
      }
      return state;
    },
    setBefreiungErlaubnisCollection(state, action) {
      state.befreiungErlaubnisCollection = action.payload;
      return state;
    },
    clear(state) {
      state.flaechenCollection = undefined;
      state.frontenCollection = undefined;
      state.generalGeometryCollection1 = undefined;
      state.befreiungErlaubnisCollection = undefined;
      return state;
    },
  },
});

export default slice;

export const {
  setFlaechenCollection,
  setFrontenCollection,
  setGeneralGeometryCollection,
  setGeneralGeometrySelected,
  setFlaechenSelected,
  setFrontenSelected,
  setBefreiungErlaubnisCollection,
  clear,
} = slice.actions;

export const getFlaechenCollection = (state) => {
  return state.mapping.flaechenCollection;
};

export const getFrontenCollection = (state) => {
  return state.mapping.frontenCollection;
};

export const getGeneralGeometryCollection = (state) => {
  return state.mapping.generalGeometryCollection;
};

export const getBefreiungErlaubnisCollection = (state) => {
  return state.mapping.befreiungErlaubnisCollection;
};