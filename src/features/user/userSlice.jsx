import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    firstName: null,
    lastName: null,
    title: null,
    email: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userId = action.payload.userId
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.title = action.payload.title
            state.email = action.payload.email
        },
        logoutUser: (state) => {
            state.userId = null
            state.firstName = null
            state.lastName = null
            state.title = null
            state.email = null
        },
    }
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
