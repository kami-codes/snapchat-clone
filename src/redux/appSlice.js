import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        captured_photo: null,
        user: null,
        currentSnap: null
    },
    reducers: {
        setCapturedPhoto: (state, action) =>{
            state.captured_photo = action.payload
        },
        resetCapturedPhoto: (state)=>{
            state.captured_photo = null
        },
        setUser: (state, action)=>{
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = null
        },
        setCurrentSnap: (state, action)=>{
            state.currentSnap = action.payload
        },
        resetCurrentSnap: (state)=>{
            state.currentSnap = null
        }
    }
})

export const {setCapturedPhoto, resetCapturedPhoto ,setUser, setCurrentSnap, resetCurrentSnap} = appSlice.actions

export default appSlice.reducer