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
        },
        setAdminLogin : (state, action) => {
            state.user = action.payload.user;
            state.isAdmin = action.payload.isAdmin;
            state.token = action.payload.token;
        }
    }
});

export const { setMode, setLogin, setLogout, setAdminLogin } = appSlice.actions;

export default appSlice.reducer;