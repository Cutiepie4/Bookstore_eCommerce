import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const createConfig = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}

export const getCarts = createAsyncThunk('cartReducers/getCarts', async (username) => {
    const res = await api.get(`/carts/${username}`, createConfig());
    return res.data;
})

export const addCart = createAsyncThunk('cartReducers/addCart', async (payload) => {
    api.post(`/carts/${payload.username}`, payload.cart, createConfig()).then(res => { toast.success('Added to your cart.') }).catch(error => toast.error(error.message));
})

export const deleteCart = createAsyncThunk('cartReducers/deleteCart', async (payload) => {
    api.delete(`/carts/${payload.username}`, { data: payload.cart, ...createConfig() }).then(res => { toast.success('Remove successfully.') });
    return payload.cart;
})