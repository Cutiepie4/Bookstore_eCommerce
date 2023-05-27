import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const login = createAsyncThunk('authReducers/login', async (account) => {
    return api.post('/auth/login', account)
        .then(response => { toast.success(`Welcome ${account.username.toUpperCase()} to bookstore`); return { response, account } })
        .catch(error => toast.error(error.message));
})

export const register = createAsyncThunk('authReducers/register', async (account) => {
    return api.post('/auth/register/user', account)
        .then(response => { toast.success(response.data) })
        .catch(error => toast.error(error.body));
})