import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { act } from "react-test-renderer";
import { ApiConstants } from "../../config/ApiConstants";
import { axiosClient } from "../../config/Axios";

interface initialStateTypes {
    isLoading: boolean
    userData?: userData
    error: string | undefined
    token: {
        access: string
        refresh: string
    } | undefined

}
const initialState: initialStateTypes = {
    userData: undefined,
    isLoading: false,
    error: '',
    token: undefined
}

interface userData {
    email: string,
    role: string,
    accesToken: string
}
interface TokenType {
    access: string
    refresh: string
    role: string
}

interface paramsTypes {
    email: string,
    password?: string
}

export interface apiErrorTypes {
    data: {
        detail: string
    }
}

const AUTH = "AUTH";

export const signin = createAsyncThunk<TokenType, paramsTypes, { rejectValue: apiErrorTypes }>(AUTH + "/signIn",
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

export const resetPassword = createAsyncThunk<userData, any, { rejectValue: apiErrorTypes }>(AUTH + "/resetPassword",
    async (params, { rejectWithValue }) => {

        try {
            const response = await axiosClient.post(ApiConstants.RESETPASSWORD, params)
            console.log(ApiConstants.RESETPASSWORD)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })


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
    extraReducers(builder) {
        builder.addCase(signin.pending, (state) => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload
            state.error = ''
        });
        builder.addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data?.detail
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data?.detail
        });
    },
})



export const { userDataReducer, resetUserDataReducer } = UserSlice.actions;
export default UserSlice.reducer;
