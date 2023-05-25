import { createSlice } from "@reduxjs/toolkit";
import { addCart, deleteCart, getCarts } from "./cartApi";

const initialState = {
    isLoading: true,
    listCarts: []
}

export const cartSlice = createSlice({
    name: 'cartReducers',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getCarts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listCarts = action.payload;
        },
        [getCarts.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteCart.fulfilled]: (state, action) => {
            state.listCarts = state.listCarts.filter(cart => cart.book.id != action.payload.book.id);
        }
    }
})

export default cartSlice.reducer;