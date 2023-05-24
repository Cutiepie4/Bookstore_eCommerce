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
            'Content-Type': 'multipart/formdata'
        }
    }
}

export default api;

export const login = createAsyncThunk('authReducers/login', async (account) => {
    return api.post('/auth/login', account)
        .then(response => { toast.success(`Welcome ${account.username.toUpperCase()} to bookstore`); return { response, account } })
        .catch(error => toast.error(error.message));
})

export const fetchBooks = createAsyncThunk('bookReducers/fetchBooks', async () => {
    const res = await api.get('/books', createConfig()).catch(error => toast.error(error.message));
    return res.data;
})

export const addBook = createAsyncThunk('bookReducers/addBook', async (formData) => {
    const res = await api.post('/books/new', formData, createConfig()).then(() => toast.success('Add book succesfully!')).catch(error => toast.error(error.message));
    return res.data;
})

export const updateBook = createAsyncThunk('bookReducers/updateBook', async (formData) => {
    const res = await api.put('/books/update', formData, createConfig()).then(() => toast.success('Update book succesfully!')).catch(error => toast.error(error.message));
    return res.data;
})

export const deleteBook = createAsyncThunk('bookReducers/deleteBook', async (id) => {
    const res = await api.delete(`/books/${id}`, createConfig()).toast.success('Delete book successfully').catch(error => toast.error(error.message));
    return res.data;
})

export const findBookById = async (id) => {
    const res = await api.get(`/books/${id}`, createConfig()).catch(error => toast.error(error.message));
    return res.data;
}
