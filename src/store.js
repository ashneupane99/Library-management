import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Pages/signin-signup/user/userSlice"
import bookReducer from "./Pages/books/bookSlice"
import burrowReducer from "./Pages/burrow-history/burrowSlice";
const store = configureStore({
    reducer: {
        adminInfo: adminReducer , 
        books: bookReducer,
        burrowHistories: burrowReducer
    },
})

export default store