import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
    userData?: userData;
}
const initialState: initialStateTypes = {
    userData: undefined,
}

interface userData {
    email: string,
    password: string,
    role: string
}
const AUTH = "AUTH";

export const UserSlice = createSlice({
    name: AUTH,
    initialState: initialState,
    reducers: {
        userDataReducer: (state, action) => {
            state.userData = action.payload
        },
        resetUserDataReducer: (state) => {
            state.userData = undefined
        }
    },
})

export const { userDataReducer, resetUserDataReducer } = UserSlice.actions;
export default UserSlice.reducer;
