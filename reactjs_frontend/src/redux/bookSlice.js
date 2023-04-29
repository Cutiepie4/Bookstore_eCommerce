import { createSlice } from "@reduxjs/toolkit"
import { fetchBooks, addBook, updateBook, deleteBook } from "./api";

const initialState = {
    listBooks: [],
    isLoading: true,
    isLoggedIn: false
}

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