import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookList: [],
    selectedbook: {}
}

const bookSlice = createSlice({
   name: "book",
   initialState,
   reducers: {
    setBooks : (state, {payload})=> {
        state.bookList = payload
    },
    setSelectedBook : (state, {payload})=> {
        state.selectedbook = payload
    }
   }
})

const {reducer, actions} = bookSlice
export const {setBooks, setSelectedBook} = actions
export default reducer