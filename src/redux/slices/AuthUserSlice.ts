import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../config/ApiConstants";
import { axiosClient } from "../../config/Axios";

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

interface paramsTypes {
    email: string,
    password: string
}

export interface apiErrorTypes {
    status: string | number
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

export const signin = createAsyncThunk<userData, paramsTypes, { rejectValue: apiErrorTypes }>(AUTH + "/SignIn",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.LOGIN, params)
            console.log(ApiConstants.LOGIN)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })


export const { userDataReducer, resetUserDataReducer } = UserSlice.actions;
export default UserSlice.reducer;
