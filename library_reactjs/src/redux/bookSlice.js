import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    listBooks: [],
    isLoading: true,
}

const bookApi = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const fetchBooks = createAsyncThunk('bookReducers/fetchBooks', async () => {
    const res = await bookApi.get('/books');
    return res.data;
})

export const addBook = createAsyncThunk('bookReducers/addBook', async (book) => {
    console.log(book)
    await bookApi.post('/books/new', book);
    return book;
})

export const updateBook = createAsyncThunk('bookReducers/updateBook', async (book) => {
    await bookApi.put('/books/update', book);
    return book;
})

export const deleteBook = createAsyncThunk('bookReducers/deleteBook', async (id) => {
    await bookApi.delete(`/books/${id}`);
    return id;
})

export const bookSlice = createSlice({
    name: 'bookReducers',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listBooks = action.payload;
        },
        [fetchBooks.pending]: (state) => {
            state.isLoading = true;
        },
        [addBook.pending]: (state) => {
            state.isLoading = true;
        },
        [addBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listBooks = [...state.listBooks, action.payload];
        },
        [updateBook.pending]: (state) => {
            state.isLoading = true;
        },
        [updateBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listBooks = [...state.listBooks.filter(item => item.id !== action.payload.id), action.payload];
        },
        [deleteBook.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listBooks = state.listBooks.filter(item => item.id !== action.payload)
        }
    }
})

export default bookSlice.reducer;