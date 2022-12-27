import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { ApiConstants } from "../../../config/ApiConstants"
import { axiosClient } from "../../../config/Axios"
import { FormDataTypes } from "./formListSlice"

export interface JobDetailsData {
    id: number | null,
    duplicates: string,
    created_at: string,
    updated_at: string,
    status: string,
    comment: [],
    is_duplicate: boolean,
    duplicate: [],
    job: [],
    return_to: number | null
    // role: { id: number, title: string }
}


interface JobDataListProps {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: JobDetailsData[]
}
interface InitialState {
    isLoading: boolean
    error: object | string | undefined
    retunJobDetails: JobDetailsData
    returnJobListData: JobDataListProps,
}



const initialState: InitialState = {
    isLoading: false,
    error: '',
    returnJobListData: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    retunJobDetails: {
        id: null,
        duplicates: '',
        created_at: '',
        updated_at: '',
        status: '',
        comment: [],
        is_duplicate: false,
        duplicate: [],
        job: [],
        return_to: null

    },
}


interface paramsTypes {
    id?: number
    // data?: FormDataTypes
    page?: number
    search?: string
    status?: string
    comment?: string
    job?: number
    duplicate?: number
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const JOB = "JOB";

export const returnJobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/returnJobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: returnJobListSlice.ts ~ line 67 ~ params", params)
            const response = await axiosClient.get(ApiConstants.RETURNJOB + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: returnJobListSlice.ts ~ line 60 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const returnDeleteJob = createAsyncThunk<string, number, { rejectValue: apiErrorTypes }>(JOB + "/returnDeleteJob", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.RETURNJOB, id)
        const response = await axiosClient.delete(ApiConstants.RETURNJOB + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const returnJobDetail = createAsyncThunk<JobDetailsData, number, { rejectValue: apiErrorTypes }>(JOB + "/returnJobDetail", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.RETURNJOB, id)
        const response = await axiosClient.get(ApiConstants.RETURNJOB + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const recentReturnJobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/recentReturnJobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file:returnJobListSlice.ts ~ line 60 ~ params", params)
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.RECENTRETURNJOB + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: returnJobListSlice.ts ~ line 69 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })
export const returnJobCreate = createAsyncThunk<JobDetailsData, paramsTypes, { rejectValue: apiErrorTypes }>(JOB + "/returnJobCreate", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.RETURNJOB, { params })
        const response = await axiosClient.post(ApiConstants.RETURNJOB, params)
        console.log('data...........=====', { response: response })
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

const returnJobListSlice = createSlice({
    name: JOB,
    initialState,
    reducers: {
    },
    extraReducers(builder) {

        //returnJob
        builder.addCase(returnJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(returnJobList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.returnJobListData?.results), ...action.payload?.results]
            }
            state.returnJobListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(returnJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        //returnDeleteJob
        builder.addCase(returnDeleteJob.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(returnDeleteJob.fulfilled, (state, action) => {
            state.isLoading = false
            state.returnJobListData = { ...state.returnJobListData, results: state.returnJobListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(returnDeleteJob.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        //return job Details
        builder.addCase(returnJobDetail.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(returnJobDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.retunJobDetails = action.payload
            state.error = ''
        });
        builder.addCase(returnJobDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
    }
})

export const { } = returnJobListSlice.actions
export default returnJobListSlice.reducer