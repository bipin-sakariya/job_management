import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { ApiConstants } from "../../../config/ApiConstants"
import { axiosClient } from "../../../config/Axios"
import { FormDataTypes } from "./formListSlice"

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
export interface JobDetailsData {
    id: number,
    added_by: Added_byData,
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
    bill?: undefined,
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
    jobDetails: JobDetailsData
    jobListData: JobDataListProps,
}

const initialState: InitialState = {
    isLoading: false,
    error: '',
    jobListData: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    jobDetails: {
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
    data?: FormDataTypes
    page?: undefined | number
    search?: string
    status?: string
    group?: number
    job?: number
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const JOB = "JOB";

export const jobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/jobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: jobListSlice.ts ~ line 60 ~ params", params)
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: jobListSlice.ts ~ line 69 ~ response", response)
            return response.data;
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

export const jobDetail = createAsyncThunk<JobDetailsData, number, { rejectValue: apiErrorTypes }>(JOB + "/jobDetails", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.JOB, id)
        const response = await axiosClient.get(ApiConstants.JOB + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const jobStatusWiseList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/jobStatusWiseList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: jobListSlice.ts ~ line 60 ~ params", params)
            const urlParams = new URLSearchParams({ page: params.page, search: params.search, status: params.status })
            params?.id && urlParams.append('id', params.id)
            console.log({ urlParams: urlParams.toString() })
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.JOBSTATUSWISE + "?" + urlParams.toString())
            console.log("🚀 ~ file: jobListSlice.ts ~ line 700 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const recentJobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/recentJobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: jobListSlice.ts ~ line 60 ~ params", params)
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.RECENTJOBLIST + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: jobListSlice.ts ~ line 69 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const recentTransferJobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/recentTransferJobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: jobListSlice.ts ~ line 60 ~ params", params)
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.RECENTTRANSFERJOBLIST + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: jobListSlice.ts ~ line 69 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const transferJobList = createAsyncThunk<JobDataListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/transferJobList", async (params, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: jobListSlice.ts ~ line 60 ~ params", params)
            // console.log('p000000000000', ApiConstants.JOB + `?page=${params.page}&search=${params.search}`)
            const response = await axiosClient.get(ApiConstants.TRANSFERJOB + `?page=${params.page}&search=${params.search}`)
            console.log("🚀 ~ file: jobListSlice.ts ~ line 69 ~ response", response)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const updateTransferJobList = createAsyncThunk<JobDetailsData, paramsTypes, { rejectValue: apiErrorTypes }>
    (JOB + "/updateTransferJobList", async (params, { rejectWithValue }) => {
        let obj = {
            group: params.group,
            job: params.job,
        }
        try {
            console.log(ApiConstants.TRANSFERJOB, { obj })
            const response = await axiosClient.post(ApiConstants.TRANSFERJOB, obj)
            console.log('data...........=====', { response: response })
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const updatejob = createAsyncThunk<string[], FormData, { rejectValue: apiErrorTypes }>(JOB + "/updateJob", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.JOB)
        const response = await axiosClient.patch(ApiConstants.JOB, params)
        console.log('data...........=====', { response: response })
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
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.jobListData?.results), ...action.payload?.results]
            }
            state.jobListData = action.meta.arg.page == 1 ? action.payload : tempArray
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
        builder.addCase(jobDetail.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(jobDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.jobDetails = action.payload
            state.error = ''
        });
        builder.addCase(jobDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        //jobstatusWiselist
        builder.addCase(jobStatusWiseList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(jobStatusWiseList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.jobListData?.results), ...action.payload?.results]
            }
            state.jobListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(jobStatusWiseList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        //recent job list
        builder.addCase(recentJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(recentJobList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.jobListData?.results), ...action.payload?.results]
            }
            state.jobListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(recentJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        //update tranfer job
        builder.addCase(updateTransferJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(updateTransferJobList.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(updateTransferJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        //tranferjob list
        builder.addCase(transferJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(transferJobList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.jobListData?.results), ...action.payload?.results]
            }
            state.jobListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(transferJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        //recentTransferJobList
        builder.addCase(recentTransferJobList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(recentTransferJobList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.jobListData?.results), ...action.payload?.results]
            }
            state.jobListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(recentTransferJobList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        //updatejob
        builder.addCase(updatejob.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(updatejob.fulfilled, (state, action) => {
            state.isLoading = false
        });
        builder.addCase(updatejob.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

    }
})

export const { } = jobListSlice.actions
export default jobListSlice.reducer