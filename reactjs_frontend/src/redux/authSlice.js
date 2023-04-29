import { createSlice } from "@reduxjs/toolkit";
import { login } from "./api";
import authService from "../service/AuthenticationService";

let initialState = {
    isLoggedIn: false,
    loginMsg: '',
    logoutMsg: 'Please log in.',
    role: 'GUEST'
}

const authSlice = createSlice({
    name: 'authReducers',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.logoutMsg = 'You logged out successfully'
            state.role = 'GUEST'
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.isLoggedIn = true;
                state.loginMsg = 'You login successfully!!!';
                state.logoutMsg = 'You already logged in';
                authService.saveSession(action.payload.data);
                state.role = authService.getAuthority();
            }
            else {
                state.isLoggedIn = false;
                state.loginMsg = 'Invalid account!';
            }
        }
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer