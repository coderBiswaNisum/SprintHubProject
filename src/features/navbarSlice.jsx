import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:0}

export const navbarSlice = createSlice({
    name:'Navbar State',
    initialState,
    reducers:{
        changeNavbarState(state,action){
            state.value = action.payload
        }
    }
})

export const {changeNavbarState} = navbarSlice.actions
export default navbarSlice.reducer