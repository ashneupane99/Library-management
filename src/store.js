import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Pages/signin-signup/user/userSlice"
import bookReducer from "./Pages/books/bookSlice"
const store = configureStore({
    reducer: {
        adminInfo: adminReducer , 
        books: bookReducer
    },
})

export default store