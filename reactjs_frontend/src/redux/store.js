import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from './bookSlice.js'
import authReducer from './authSlice.js'
import cartReducer from './cartSlice.js'

const store = configureStore({
    reducer: { bookReducer, authReducer, cartReducer },
    middleware: [thunk]
})

export default store;