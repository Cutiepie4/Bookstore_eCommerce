import { createSlice } from "@reduxjs/toolkit"
import { fetchBooks, addBook, updateBook, deleteBook } from "./bookApi";

const initialState = {
    listBooks: [],
    isLoading: true
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
            state.listBooks = action.payload;
        },
        [updateBook.pending]: (state) => {
            state.isLoading = true;
        },
        [updateBook.fulfilled]: (state, action) => {
            state.listBooks = action.payload;
            state.isLoading = false;
        },
        [deleteBook.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.listBooks = action.payload;
            state.isLoading = false;
        }
    }
})

export default bookSlice.reducer;