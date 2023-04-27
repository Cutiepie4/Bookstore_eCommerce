import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import bookReducer from './bookSlice.js'

const store = configureStore({
    reducer: { bookReducer },
    middleware: [thunk]
})

export default store;