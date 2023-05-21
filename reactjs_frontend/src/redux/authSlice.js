import { createSlice } from "@reduxjs/toolkit";
import { login } from "./api";
import authService from "../service/AuthenticationService";

let initialState = {
    isLoggedIn: false,
    loginMsg: '',
    role: 'GUEST',
    account: null
}

const authSlice = createSlice({
    name: 'authReducers',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = 'GUEST'
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.payload.response.status === 200) {
                state.isLoggedIn = true;
                state.loginMsg = '';
                state.role = authService.getAuthority();
                state.account = action.payload.account;
                authService.saveSession(action.payload.response.data);
            }
            else {
                state.account = null;
                state.isLoggedIn = false;
                state.loginMsg = 'Invalid account!';
            }
        }
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer