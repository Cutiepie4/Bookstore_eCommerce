import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from './bookSlice.js'
import authReducer from './authSlice.js'

const store = configureStore({
    reducer: { bookReducer, authReducer },
    middleware: [thunk]
})

export default store;