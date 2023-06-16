import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    burrowHistoryList: [],
 
    // landingburrowHistory:{},
}

const burrowHistorySlice = createSlice({
   name: "burrowHistory",
   initialState,
   reducers: {
    setburrowHistorys : (state, {payload})=> {
        state.burrowHistoryList = payload
    },
   
    // setLandingburrowHistory : (state, {payload})=> {
    //     state.landingburrowHistory = payload
    // }
   }
})

const {reducer, actions} = burrowHistorySlice
export const {setburrowHistorys,  } = actions
export default reducer