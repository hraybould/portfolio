import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  cvMode: boolean;
}

const initialState: ToggleState = {
  cvMode: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    // TODO: Allow a set mode
    // IDEA: Save value to local storage to reload when user returns
    setMode(state, payload) {
      state.cvMode = false;
    },
    toggleMode(state) {
      state.cvMode = !state.cvMode;
    },
  },
});

export const { setMode, toggleMode } = toggleSlice.actions;
export default toggleSlice.reducer;
