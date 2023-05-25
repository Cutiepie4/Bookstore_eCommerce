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

export const fetchBooks = createAsyncThunk('bookReducers/fetchBooks', async () => {
    const res = await api.get('/books').catch(error => toast.error(error.message));
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

export const findTop5BestSellers = async () => {
    const res = await api.get('/books/best-sellers').catch(error => toast.error(error.message));
    return res.data;
}