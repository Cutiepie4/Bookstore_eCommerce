import { createSlice } from "@reduxjs/toolkit";
import { addCart, deleteCart, getCarts } from "./cartApi";

const initialState = {
    isLoading: true,
    listCarts: [],
    cartsCount: 0
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
            state.cartsCount = state.listCarts.length;
        },
        [getCarts.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteCart.fulfilled]: (state, action) => {
            state.listCarts = state.listCarts.filter(cart => cart.book.id != action.payload.book.id);
            state.cartsCount = state.listCarts.length;
        },
        [addCart.fulfilled]: (state, action) => {
            state.listCarts = [...state.listCarts.filter(cart => cart.book.id !== action.payload.book.id), action.payload];
            state.cartsCount = state.listCarts.length;
        }
    }
})

export default cartSlice.reducer;