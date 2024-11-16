import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state)=>{
            state.loading = true
        },
        signinSuccess: (state, action)=>{
            state.user = action.payload,
            state.loading = false,
            state.error = null
        },
        signinFailure: (state, action)=>{
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {signinStart, signinSuccess, signinFailure} = userSlice.actions;
export default userSlice.reducer;