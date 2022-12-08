import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { ApiConstants } from "../../../config/ApiConstants"
import { axiosClient } from "../../../config/Axios"

interface added_byData {
    id: number | null,
    profile_image?: string,
    user_name?: string,
    email: string,
    phone?: string,
    date_joined: string,
    role: {
        id: number | null,
        title: string
    },
    is_active: boolean
}
export interface jobDetailsData {
    id: number | null,
    added_by: added_byData,
    closed_by?: null,
    images: undefined,
    attachments: undefined,
    forms?: undefined,
    bills?: undefined,
    group_forms?: undefined,
    created_at: string,
    updated_at: string,
    address: string,
    address_information: string,
    description: string,
    latitude?: string,
    longitude?: string,
    priority?: boolean,
    further_inspection?: boolean,
    notes?: null,
    status?: string,
    comment?: null,
    form?: undefined,
    bill?: undefined
}

interface initialState {
    isLoading: boolean
    error: object | string | undefined
    jobDetails: jobDetailsData
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    jobDetails: {
        id: null,
        added_by: {
            id: null,
            profile_image: '',
            user_name: '',
            email: '',
            phone: '',
            date_joined: '',
            role: {
                id: null,
                title: ''
            },
            is_active: false
        },
        closed_by: null,
        images: undefined,
        attachments: undefined,
        forms: undefined,
        bills: undefined,
        group_forms: undefined,
        created_at: '',
        updated_at: '',
        address: '',
        address_information: '',
        description: '',
        latitude: '',
        longitude: '',
        priority: false,
        further_inspection: false,
        notes: null,
        status: '',
        comment: null,
        form: undefined,
        bill: undefined
    }
}

interface paramsTypes {
    id?: number
    data?: FormData,
    page?: undefined | number,
    searchTxt?: string
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const JOB = "JOB";

export const jobList = createAsyncThunk
    (JOB + "/jobList", async (params: paramsTypes, { rejectWithValue }) => {
        try {
            console.log(ApiConstants.JOB)
            //search
            let response
            if (params.searchTxt) {
                response = await axiosClient.get(ApiConstants.JOB + `?search=${params.searchTxt}&page=${params.page}`)
            } else {
                response = await axiosClient.get(ApiConstants.JOB + `?page=${params.page}`)
            }
            return response;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const jobCreate = createAsyncThunk<string[], FormData, { rejectValue: apiErrorTypes }>(JOB + "/jobCreate", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.JOB, params)
        const response = await axiosClient.post(ApiConstants.JOB, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const jobDetails = createAsyncThunk<jobDetailsData, paramsTypes, { rejectValue: apiErrorTypes }>(JOB + "/jobDetails", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.JOB, params)
        const response = await axiosClient.post(ApiConstants.JOB + params.id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

const jobListSlice = createSlice({
    name: JOB,
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Job list
        builder.addCase(jobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(jobList.fulfilled, (state, action) => {
            state.isLoading = false
            // let tempArray: billDataProps = action.meta.arg.page == 1 ? [] : {
            //     ...action.payload.data,
            //     results: [...current(state.billListData?.results), ...action.payload?.data?.results]
            // }
            // state.billListData = action.meta.arg.page == 1 ? action.payload.data : tempArray
            state.error = ''
        });
        builder.addCase(jobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        // Create job
        builder.addCase(jobCreate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(jobCreate.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(jobCreate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        // Job Details
        builder.addCase(jobDetails.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(jobDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.jobDetails = action.payload
            state.error = ''
        });
        builder.addCase(jobDetails.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

    }
})

export const { } = jobListSlice.actions
export default jobListSlice.reducer