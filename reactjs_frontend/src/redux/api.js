import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const createConfig = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/formdata'
        }
    }
}

export default api;

export const login = createAsyncThunk('authReducers/login', async (credential) => {
    return api.post('/auth/login', credential)
        .then(res => res)
        .catch(error => error.response);
})

export const fetchBooks = createAsyncThunk('bookReducers/fetchBooks', async () => {
    const res = await api.get('/books', createConfig());
    return res.data;
})

export const addBook = createAsyncThunk('bookReducers/addBook', async (formData) => {
    const res = await api.post('/books/new', formData, createConfig());
    return res.data;
})

export const updateBook = createAsyncThunk('bookReducers/updateBook', async (formData) => {
    const res = await api.put('/books/update', formData, createConfig());
    return res.data;
})

export const deleteBook = createAsyncThunk('bookReducers/deleteBook', async (id) => {
    const res = await api.delete(`/books/${id}`, createConfig());
    return res.data;
})

export const findBookById = async (id) => {
    const res = await api.get(`/books/${id}`, createConfig());
    return res.data;
}
