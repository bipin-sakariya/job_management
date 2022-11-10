import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";

export interface userData {
    id: number,
    profile_image: string,
    user_name: string,
    email: string,
    phone: string,
    role: string,
}

interface userDetails {
    id: number,
    profile_image: string,
    user_name: string,
    email: string,
    phone: string,
    role: { id: number, title: string }
}

export interface userRoleListProps {
    id: number,
    title: string
}
interface paramsTypes {
    id?: number
    data?: FormData
}
interface initialState {
    isLoading: boolean
    error: object | string | undefined
    userListData: userData[] | [],
    userDetails?: userDetails,
    userRoleList?: userRoleListProps[]
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    userListData: [],
    userDetails: undefined,
    userRoleList: []
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const USER = "USER";

export const userRoleList = createAsyncThunk<userRoleListProps[], "", { rejectValue: apiErrorTypes }>
    (USER + "/userRoleList", async (_: any, { rejectWithValue }) => {
        try {
            console.log(ApiConstants.USERROLELIST)
            const response = await axiosClient.get(ApiConstants.USERROLELIST)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const getListOfUsers = createAsyncThunk<userData[], string, { rejectValue: apiErrorTypes }>
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

export const createUser = createAsyncThunk<string[], paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/createUser", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSCREATE, params)
        const response = await axiosClient.post(ApiConstants.USERSCREATE, params.data)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const detailsOfUser = createAsyncThunk<userDetails, paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/detailsOfUser", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSCREATE, params)
        const response = await axiosClient.get(ApiConstants.USERSCREATE + params.id + "/")
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const deleteUser = createAsyncThunk<string, paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/deleteUser", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSDELETE, params)
        const response = await axiosClient.delete(ApiConstants.USERSDELETE + params.id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const updateUser = createAsyncThunk<string, paramsTypes, { rejectValue: apiErrorTypes }>(USER + "/updateUser", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.USERSDELETE, params)
        const response = await axiosClient.put(ApiConstants.USERSUPDATE + params.id + '/', params.data)
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
        resetUserDetails: (state) => {
            state.userDetails = undefined
        }
    },
    extraReducers(builder) {
        builder.addCase(userRoleList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(userRoleList.fulfilled, (state, action) => {
            state.isLoading = false
            state.userRoleList = action.payload
            state.error = ''
        });
        builder.addCase(userRoleList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

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

        builder.addCase(createUser.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data
        });

        builder.addCase(detailsOfUser.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(detailsOfUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.userDetails = action.payload
            state.error = ''
        });
        builder.addCase(detailsOfUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.data
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
            state.error = action.payload?.data
        });

        builder.addCase(updateUser.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.data
        });
    },
})

export const { resetUserDetails } = userListSlice.actions
export default userListSlice.reducer

