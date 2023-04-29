import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const createConfig = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
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

export const addBook = createAsyncThunk('bookReducers/addBook', async (book) => {
    await api.post('/books/new', book, createConfig());
    return book;
})

export const updateBook = createAsyncThunk('bookReducers/updateBook', async (book) => {
    await api.put('/books/update', book, createConfig());
    return book;
})

export const deleteBook = createAsyncThunk('bookReducers/deleteBook', async (id) => {
    await api.delete(`/books/${id}`, createConfig());
    return id;
})