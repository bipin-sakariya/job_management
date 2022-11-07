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

interface initialState {
    isLoading: boolean
    error: string
    userListData: userData[] | []
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    userListData: [],
}

export interface apiErrorTypes {
    data: {
        detail: string
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
    },
})

export default userListSlice.reducer

