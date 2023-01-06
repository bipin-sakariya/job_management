import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { ApiConstants } from "../../../config/ApiConstants"
import { axiosClient } from "../../../config/Axios"
import { FormDataTypes } from "./formListSlice"
import { formdata } from "./jobListSlice"
interface Added_byData {
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

interface Return_Job {
    job: number,
    comment: string,
    status: string,
    duplicate: number,
    is_duplicate: boolean,
    duplicate_job: {
        id: number,
        address: string,
        created_at: string,
        address_information: string,
        description: string,
        status: string,
        images: undefined,
        attachments: undefined
    }
}
export interface JobDetailsData {
    id: number,
    added_by: Added_byData,
    closed_by?: null,
    images?: { image: string | undefined }[],
    attachments?: { attachment: string | undefined }[],
    forms?: undefined,
    bills?: [],
    group_forms?: formdata[] | [],
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
    bill?: undefined,
    return_job?: Return_Job[] | undefined,
    transfer_to?: { id: number, name: string }[]
    // role: { id: number, title: string }
}


interface JobDataListProps {
    count?: number,
    next?: string | null,
    previous?: string | null,
    results: JobDetailsData[]
}
interface InitialState {
    isLoading: boolean
    error: object | string | undefined
    retunJobDetails: JobDetailsData
    returnJobListData: JobDataListProps
    resentReturnJobList: JobDataListProps
    resentJobList: JobDataListProps
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
        id: 0,
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
        images: [{ image: '' }],
        attachments: [{ attachment: '' }],
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
        bill: undefined,
        return_job: [],
        transfer_to: []
    },
    resentReturnJobList: {
        count: undefined,
        next: undefined,
        previous: undefined,
        results: []
    },
    resentJobList: {
        count: undefined,
        next: undefined,
        previous: undefined,
        results: []
    }
}


interface paramsTypes {
    id?: number
    formData?: FormData
    page?: number
    search?: string
    status?: string
    comment?: string
    job?: number
    duplicate?: number
    Data?: FormData
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
            const response = await axiosClient.get(ApiConstants.RETURNJOB + `?page=${params.page}&search=${params.search}`)
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
            const response = await axiosClient.get(ApiConstants.RECENTRETURNJOB + `?page=${params.page}&search=${params.search}`)
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
        const response = await axiosClient.post(ApiConstants.RETURNJOB, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})
export const returnJobUpdate = createAsyncThunk<string[], paramsTypes, { rejectValue: apiErrorTypes }>(JOB + "/returnJobUpdate", async (params, { rejectWithValue }) => {
    console.log({ params })
    try {
        const response = await axiosClient.patch(ApiConstants.RETURNJOB + params.id + '/', params.formData)
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
            state.error = ''
            // let tempArray = action.meta.arg.page == 1 ? action.payload : {
            //     ...action.payload,
            //     results: [...current(state.returnJobListData?.results), ...action.payload?.results]
            // }
            state.returnJobListData = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.returnJobListData?.results), ...action.payload?.results]
            }
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
        builder.addCase(recentReturnJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(recentReturnJobList.fulfilled, (state, action) => {
            state.isLoading = false
            state.resentReturnJobList = action.payload
            // state.returnJobListData = { ...state.returnJobListData, results: state.returnJobListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(recentReturnJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(returnJobUpdate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(returnJobUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            // state.returnJobListData = { ...state.returnJobListData, results: state.returnJobListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(returnJobUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
    }
})

export const { } = returnJobListSlice.actions
export default returnJobListSlice.reducer