import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
};

export const appSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
        state.token = action.payload.token;
        state.id = action.payload.id;
      },
    },
  });
  
  export const { setMode, setLogin, setLogout } = appSlice.actions;
  
  export default appSlice.reducer;