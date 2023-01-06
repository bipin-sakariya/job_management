import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../config/ApiConstants";
import { axiosClient } from "../../config/Axios";

interface initialStateTypes {
    isLoading: boolean
    userData?: userData
    error: string | undefined
    token: TokenType | undefined

}
export interface UserData {
    id: number
    profile_image: string
    user_name: string
    email: string
    phone: string
    role: { id: number, title: string }
    is_active: boolean
    date_joined: string
}
const initialState: initialStateTypes = {
    userData: undefined,
    isLoading: false,
    error: '',
    token: undefined,
}

interface userData {
    email: string,
    role: string,
    accesToken: string,
    user: user
}

interface user {
    id: number,
    profile_image: string,
    user_name: string,
    email: string,
    phone: string,
    date_joined: string,
    role: {
        id: number,
        title: string
    },
    is_active: boolean

}
interface TokenType {
    access: string
    refresh: string
    role: string
    user: user
}

interface paramsTypes {
    email?: string,
    password?: string,
    id?: number,
    old_password?: string,
    new_password?: string,
    data?: FormData,
}

export interface apiErrorTypes {
    data: {
        detail: string
    }
}

const AUTH = "AUTH";
const USER = "USER";

export const signin = createAsyncThunk<TokenType, paramsTypes, { rejectValue: apiErrorTypes }>(AUTH + "/signIn",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.LOGIN, params)
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
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })
export const updateUserProfile = createAsyncThunk<UserData, paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/updateUserProfile", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USER, params)
        const response = await axiosClient.patch(ApiConstants.USER + params.id + '/', params.data)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})
export const changePassword = createAsyncThunk<string, paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/changePassword", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.CHANGEPASSWORD, params)
        const response = await axiosClient.put(ApiConstants.CHANGEPASSWORD, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const userInfo = createAsyncThunk<UserData, { rejectValue: apiErrorTypes }>(USER + "/userInfo", async (_, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERINFO)
        const response = await axiosClient.get(ApiConstants.USERINFO)
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
            state.userData = action.payload.userdata
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
        builder.addCase(updateUserProfile.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = { ...state.token, user: action.payload }
            state.error = ''
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.data
        });
        builder.addCase(changePassword.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.data
        });
        builder.addCase(userInfo.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.isLoading = false
            // state.token?.user = action.payload
            state.error = ''
        });
        builder.addCase(userInfo.rejected, (state, action) => {
            state.isLoading = false
            // state.error = action.payload?.data
        });
    },
})

export const { userDataReducer, resetUserDataReducer } = UserSlice.actions;
export default UserSlice.reducer;
