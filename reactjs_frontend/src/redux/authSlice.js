import { createSlice } from "@reduxjs/toolkit";
import { login } from "./loginApi";
import authService from "../service/AuthenticationService";
import { toast } from "react-toastify";

let initialState = {
    isLoggedIn: authService.getToken() === null ? false : true,
    role: authService.getRole(),
    username: authService.getUsername()
}

const authSlice = createSlice({
    name: 'authReducers',
    initialState,
    reducers: {
        logout: (state) => {
            authService.clearCredentail();
            state.isLoggedIn = false;
            state.role = 'GUEST';
            state.username = null;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.payload.response.status === 200) {
                authService.saveCredentail(action.payload.response.data, action.payload.account);
                state.isLoggedIn = true;
                state.role = authService.getRole();
                state.username = authService.getUsername();
            }
            else {
                state.username = null;
                state.isLoggedIn = false;
                state.role = 'GUEST';
                authService.clearCredentail();
            }
        }
    }
})

export const { logout, test } = authSlice.actions;
export default authSlice.reducer