import { createSlice } from "@reduxjs/toolkit";

const initialState = { readOnly: false, showChat: false };

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setReadOnly(state, action) {
      state.readOnly = action.payload;
      return state;
    },
    setShowChat(state, action) {
      state.showChat = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setReadOnly, setShowChat } = slice.actions;

export const getReadOnly = (state) => {
  return state.settings.readOnly;
};

export const getShowChat = (state) => {
  return state.settings.showChat;
};
