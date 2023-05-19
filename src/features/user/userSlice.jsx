import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    firstName: null,
    email: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.uid = action.payload.uid
            state.firstName = action.payload.firstName
            state.email = action.payload.email
        },
        logoutUser: (state) => {
            state.uid = null
            state.firstName = null
            state.email = null
        },
    }
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
