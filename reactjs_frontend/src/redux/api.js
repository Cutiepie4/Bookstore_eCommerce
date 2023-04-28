import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from '../service/AuthenticationService'

const bookApi = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const token = sessionStorage.getItem('token');

const createConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export default bookApi;

export const logIn = async (credential) => {
    return bookApi.post('/auth/login', credential)
        .then(res => {
            authService.saveToken(res.data.token);
        })
        .catch(error => error.response);
}

export const fetchBooks = createAsyncThunk('bookReducers/fetchBooks', async () => {
    const res = await bookApi.get('/books', createConfig(token));
    return res.data;
})

export const addBook = createAsyncThunk('bookReducers/addBook', async (book) => {
    await bookApi.post('/books/new', book, createConfig(token));
    return book;
})

export const updateBook = createAsyncThunk('bookReducers/updateBook', async (book) => {
    await bookApi.put('/books/update', book, createConfig(token));
    return book;
})

export const deleteBook = createAsyncThunk('bookReducers/deleteBook', async (id) => {
    await bookApi.delete(`/books/${id}`, createConfig(token));
    return id;
})