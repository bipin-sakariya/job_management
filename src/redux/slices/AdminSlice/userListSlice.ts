import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";

interface userData {
    profile_image: string,
    user_name: string,
    email: string,
    phone: string,
    role: string,
}

interface paramsTypes {
    id: number
}
interface initialState {
    isLoading: boolean
    error: object | string | undefined
    userListData: userData[] | []
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    userListData: [],
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const USER = "USER";

export const getListOfUsers = createAsyncThunk<userData[], { rejectValue: apiErrorTypes }>
    (USER + "/getListOfUsers", async (_: any, { rejectWithValue }) => {
        try {
            console.log(ApiConstants.USERDETAIL)
            const response = await axiosClient.get(ApiConstants.USERDETAIL)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const createUsers = createAsyncThunk<"", FormData, { rejectValue: apiErrorTypes }>(USER + "/createUsers", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSCREATE, params)
        const response = await axiosClient.post(ApiConstants.USERSCREATE, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const deleteUser = createAsyncThunk<"", paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/deleteUser", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSDELETE, params)
        const response = await axiosClient.post(ApiConstants.USERSDELETE + params + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

const userListSlice = createSlice({
    name: USER,
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getListOfUsers.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(getListOfUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(getListOfUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(createUsers.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(createUsers.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(createUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data
        });
        builder.addCase(deleteUser.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = ""
        });
    },
})

export default userListSlice.reducer

