import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";


export interface MemberDetailsProps {
    email: string
    id: number
    phone: string
    profile_image: string
    role: number
    user_name: string
}
export interface GroupData {
    id: number,
    manager_details: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    inspector_details: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    member_details: MemberDetailsProps[],
    form_details: [{
        bill: [],
        created_at: string,
        id: number,
        is_sign: boolean,
        name: string,
        updated_at: string
    }],
    total_member_in_group: string,
    assign_jobs: string,
    created_at: string,
    updated_at: string,
    name: string,
    image: string,
    manager: number,
    inspector: number,
    member: number[]
}

interface GroupDataProps {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: GroupData[]
}

interface InitialState {
    isLoading: boolean
    error: object | string | undefined
    groupListData: GroupDataProps,
    groupDetails: GroupData
}

interface paramsTypes {
    id?: number
    data?: FormData,
    page?: undefined | number,
    search?: string
}

const initialState: InitialState = {
    isLoading: false,
    error: '',
    groupListData: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    groupDetails: {
        id: 0,
        manager_details: {
            user_name: '',
            email: '',
            id: 0,
            phone: '',
            profile_image: '',
            role: 0
        },
        inspector_details: {
            user_name: '',
            email: '',
            id: 0,
            phone: '',
            profile_image: '',
            role: 0
        },
        member_details: [{
            user_name: '',
            email: '',
            id: 0,
            phone: '',
            profile_image: '',
            role: 0
        }],
        form_details: [{
            bill: [],
            created_at: '',
            id: 0,
            is_sign: false,
            name: '',
            updated_at: ''
        }],
        total_member_in_group: '',
        assign_jobs: '',
        created_at: '',
        updated_at: '',
        name: '',
        image: '',
        manager: 0,
        inspector: 0,
        member: []
    }
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const GROUP = "GROUP";

export const groupList = createAsyncThunk<GroupDataProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (GROUP + "/groupList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: groupListSlice.ts ~ line 60 ~ params", params)
            console.log(ApiConstants.GROUPLIST)
            const response = await axiosClient.get(ApiConstants.GROUPLIST + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: groupListSlice.ts ~ line 69 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const groupDelete = createAsyncThunk<string, number, { rejectValue: apiErrorTypes }>(GROUP + "/groupDelete", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.GROUPLIST, id)
        const response = await axiosClient.delete(ApiConstants.GROUPLIST + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})
export const groupUpdate = createAsyncThunk<string[], paramsTypes, { rejectValue: apiErrorTypes }>(GROUP + "/groupUpdate", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.GROUPLIST, params)
        const response = await axiosClient.patch(ApiConstants.GROUPLIST + params.id + '/', params.data)
        console.log('response check update group', { response })
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const groupDetail = createAsyncThunk<GroupData, number, { rejectValue: apiErrorTypes }>(GROUP + "/groupDetail", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.GROUPLIST, id)
        const response = await axiosClient.get(ApiConstants.GROUPLIST + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})
export const createGroup = createAsyncThunk<string[], FormData, { rejectValue: apiErrorTypes }>(GROUP + "/createGroup", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.GROUPLIST, params)
        const response = await axiosClient.post(ApiConstants.GROUPLIST, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})


const groupListSlice = createSlice({
    name: GROUP,
    initialState,
    reducers: {
        groupDetails: (state,) => {
            state.groupDetails = {
                id: 0,
                manager_details: {
                    user_name: '',
                    email: '',
                    id: 0,
                    phone: '',
                    profile_image: '',
                    role: 0
                },
                inspector_details: {
                    user_name: '',
                    email: '',
                    id: 0,
                    phone: '',
                    profile_image: '',
                    role: 0
                },
                member_details: [{
                    user_name: '',
                    email: '',
                    id: 0,
                    phone: '',
                    profile_image: '',
                    role: 0
                }],
                form_details: [{
                    bill: [],
                    created_at: '',
                    id: 0,
                    is_sign: false,
                    name: '',
                    updated_at: ''
                }],
                total_member_in_group: '',
                assign_jobs: '',
                created_at: '',
                updated_at: '',
                name: '',
                image: '',
                manager: 0,
                inspector: 0,
                member: []
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(groupList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(groupList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.groupListData?.results), ...action.payload?.results]
            }
            state.groupListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(groupList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(groupDelete.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(groupDelete.fulfilled, (state, action) => {
            state.isLoading = false
            state.groupListData = { ...state.groupListData, results: state.groupListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(groupDelete.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(groupUpdate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(groupUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(groupUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(groupDetail.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(groupDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.groupDetails = action.payload
            state.error = ''
        });
        builder.addCase(groupDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(createGroup.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(createGroup.fulfilled, (state, action) => {
            state.isLoading = false
            // state.userListData = action.payload
            state.error = ''
        });
        builder.addCase(createGroup.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data
        });


    }
})

export const { groupDetails } = groupListSlice.actions
export default groupListSlice.reducer