import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";

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

interface userDataListProps {
    count: number
    next: string | null
    previous: number | null
    results: UserData[]
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
    count: number
    next: string | null
    previous: number | null
    results: [{
        id: number,
        title: string
    }]
}
export interface inspectorListProps {
    count: number
    next: string | null
    previous: number | null
    results: UserData[]
}


interface paramsTypes {
    id?: number
    data?: FormData,
    role?: string,
    page?: number,
    search?: string,
    old_password?: string,
    new_password?: string,
}
interface initialState {
    isLoading: boolean
    error: object | string | undefined
    userListData: UserData[] | [],
    userDetails?: userDetails,
    userRoleList?: [{
        id: number,
        title: string
    }]
    userGroupRoleList?: [{
        id: number,
        user_name: string,
        profile_image: string,
        email: string,
        phone: string,
        date_joined: string,
        role: string,
        is_active: boolean
    }],
    userInformation: UserData | undefined
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    userListData: [],
    userDetails: undefined,
    userRoleList: undefined,
    userGroupRoleList: undefined,
    userInformation: undefined

}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const USER = "USER";

export const userRoleList = createAsyncThunk<userRoleListProps, string, { rejectValue: apiErrorTypes }>
    (USER + "/userRoleList", async (_: any, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.USERROLELIST)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const getListOfUsers = createAsyncThunk<userDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (USER + "/getListOfUsers", async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.USER + `?page=${params.page}&search=${params.search}`)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const createUser = createAsyncThunk<string[], FormData, { rejectValue: apiErrorTypes }>(USER + "/createUser", async (params, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post(ApiConstants.USER, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const detailsOfUser = createAsyncThunk<userDetails, number, { rejectValue: apiErrorTypes }>(USER + "/detailsOfUser", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.get(ApiConstants.USER + id + "/")
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const deleteUser = createAsyncThunk<string, number, { rejectValue: apiErrorTypes }>(USER + "/deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.delete(ApiConstants.USER + id + '/')
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
        const response = await axiosClient.put(ApiConstants.USER + params.id + '/', params.data)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const roleList = createAsyncThunk<inspectorListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (USER + "/roleList", async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.USERGROUPROLELIST + `?role=${params.role}`)
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
            state.userRoleList = action.payload.results
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
            state.userListData = action.payload.results
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
            state.userListData = state.userListData.filter(i => i.id !== action.meta.arg)
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
        builder.addCase(roleList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(roleList.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(roleList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
    },
})

export const { resetUserDetails } = userListSlice.actions
export default userListSlice.reducer

