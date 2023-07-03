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
        setMode : (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setMode, setLogin, setLogout } = appSlice.actions;

export default appSlice.reducer;