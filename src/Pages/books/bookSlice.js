import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookList: [],
    selectedbook: {},
    // landingBook:{},
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
    },
    // setLandingBook : (state, {payload})=> {
    //     state.landingbook = payload
    // }
   }
})

const {reducer, actions} = bookSlice
export const {setBooks, setSelectedBook, setLandingBook} = actions
export default reducer