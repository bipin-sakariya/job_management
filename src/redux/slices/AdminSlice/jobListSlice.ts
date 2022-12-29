import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { ApiConstants } from "../../../config/ApiConstants"
import { axiosClient } from "../../../config/Axios"
import { strings } from "../../../languages/localizedStrings"
import { billCreate, billData } from "./billListSlice"
import { FormDataTypes } from "./formListSlice"

export interface Added_byData {
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
    images: [{ image: string | undefined }]
    attachments: [{}],
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
    return_job?: Return_Job,
    transfer_to?: {
        id: number,
        name: string
    }
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
    closedJobList: JobDataListProps
    openedJobList: JobDataListProps
    jobListData: JobDataListProps,
    formData: formdata[] | undefined,
    jobDetailsData: JobDetailsData | undefined
    selectedFormsDetailForJob: { isSignBill: boolean, selectedFormsBillList: billData[] | [], selectedFormsDetails: FormDataTypes[] | [] }
    isFromCloseJob: boolean
    isSignBillUpdatable: boolean
    newlyCreatedBillsForCloseJob: billData[] | []
    selectedSignBillsForCloseJob: billData[] | []
}


interface formdata {
    bill: billData[]
    created_at: string
    id: number
    is_sign: boolean
    name: string
    updated_at: string
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
    closedJobList: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    openedJobList: {
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
        images: [{ image: '' }],
        attachments: [{}],
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
        return_job: undefined,
        transfer_to: {
            id: 0,
            name: ''
        }
    },
    formData: undefined,
    jobDetailsData: undefined,
    selectedFormsDetailForJob: {
        isSignBill: false,
        selectedFormsBillList: [],
        selectedFormsDetails: [],
    },
    isFromCloseJob: false,
    newlyCreatedBillsForCloseJob: [],
    isSignBillUpdatable: true,
    selectedSignBillsForCloseJob: []
}


interface paramsTypes {
    id?: number
    data?: FormDataTypes
    page?: number
    search?: string
    status?: string
    group?: number
    job?: number
    from_date?: string
    to_date?: string
    formData?: FormData
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
            const urlParams = new URLSearchParams({ page: params.page?.toString() ?? '', status: params.status ?? '' })
            params?.search && urlParams.append('search', params.search ?? '')
            params?.id && urlParams.append('id', params.id.toString())
            params?.from_date && urlParams.append('from_date', params.from_date)
            params?.to_date && urlParams.append('to_date', params.to_date)
            console.log({ urlParams: urlParams.toString() })

            const response = await axiosClient.get(ApiConstants.JOBSTATUSWISE + "?" + urlParams.toString())
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

export const updatejob = createAsyncThunk<string[], paramsTypes, { rejectValue: apiErrorTypes }>(JOB + "/updateJob", async (params, { rejectWithValue }) => {
    try {
        const response = await axiosClient.patch(ApiConstants.JOB + params.id + '/', params.formData)
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
    reducers: {
        resetSelectedFormsBillReducer: (state) => {
            state.selectedFormsDetailForJob = { isSignBill: false, selectedFormsBillList: [], selectedFormsDetails: [] }
            state.isFromCloseJob = false
            state.newlyCreatedBillsForCloseJob = []
            state.isSignBillUpdatable = true
            state.selectedSignBillsForCloseJob = []
        },
        selectedFormDetialsForCreateJobReducers: (state, action) => {
            state.selectedFormsDetailForJob = { ...state.selectedFormsDetailForJob, ...action.payload, isSignBill: state.isSignBillUpdatable ? action.payload.isSignBill : state.selectedFormsDetailForJob.isSignBill }
            let materialBillData: billData[] = action.payload.selectedFormsBillList.filter((bill: billData) => bill.type == 'Material')
            let jsonObject = [...materialBillData].map((item) => JSON.stringify(item));
            let uniqueSet = new Set(jsonObject);
            let uniqueArray = Array.from(uniqueSet).map((item) => JSON.parse(item));
            state.selectedFormsDetailForJob.selectedFormsBillList = uniqueArray
        },
        storeUserInteractionWithBillCreation: (state) => {
            state.isFromCloseJob = true
        },
        storeCreatedBillDetailsForCloseJob: (state, action: { payload: billData }) => {
            state.selectedFormsDetailForJob.isSignBill = state.isSignBillUpdatable ? action.payload.type == 'Sign' ? true : state.selectedFormsDetailForJob.isSignBill : state.selectedFormsDetailForJob.isSignBill
            state.isSignBillUpdatable = action.payload.type == 'Sign' ? false : state.isSignBillUpdatable
            state.newlyCreatedBillsForCloseJob = [...current(state.newlyCreatedBillsForCloseJob), action.payload]
        },
        jobDetailReducer: (state, action) => {
            state.jobDetailsData = action.payload
        },
        resetJobDetailReducer: (state) => {
            state.jobDetailsData = undefined
        },
        updateSelectedBilllDetials: (state, action) => {
            const isFromNewCreateBill = state.newlyCreatedBillsForCloseJob.find((bill) => bill.id == action.payload.id)
            const isFromFormsBill = state.selectedFormsDetailForJob.selectedFormsBillList.find((bill) => bill.id == action.payload.id)
            const isFromSignBill = state.selectedSignBillsForCloseJob.find((bill) => bill.id == action.payload.id)
            if (isFromNewCreateBill) {
                let index = state.newlyCreatedBillsForCloseJob.findIndex((bill) => bill.id == action.payload.id)
                state.newlyCreatedBillsForCloseJob.splice(index, 1, action.payload)
            } else if (isFromFormsBill) {
                let index = state.selectedFormsDetailForJob.selectedFormsBillList.findIndex((bill) => bill.id == action.payload.id)
                state.selectedFormsDetailForJob.selectedFormsBillList.splice(index, 1, action.payload)
            } else if (isFromSignBill) {
                let index = state.selectedSignBillsForCloseJob.findIndex((bill) => bill.id == action.payload.id)
                state.selectedSignBillsForCloseJob.splice(index, 1, action.payload)
            }
        },
        updateSelectedSignBillListReducer: (state, action) => {
            state.selectedFormsDetailForJob.isSignBill = state.isSignBillUpdatable ? action.payload.type == 'Sign' ? true : state.selectedFormsDetailForJob.isSignBill : state.selectedFormsDetailForJob.isSignBill
            state.isSignBillUpdatable = action.payload.type == 'Sign' ? false : state.isSignBillUpdatable
            const isSignIn = state.selectedFormsDetailForJob.selectedFormsDetails.find((forms: FormDataTypes) => forms.is_sign)

            state.selectedFormsDetailForJob.isSignBill = (state.newlyCreatedBillsForCloseJob.length || action.payload.signBills.length || isSignIn) ? true : false
            state.selectedSignBillsForCloseJob = action.payload.signBills
            state.isSignBillUpdatable = state.selectedFormsDetailForJob.isSignBill === true ? false : true
        }
    },
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
                results: [...current(action.meta.arg.status == strings.open ? state.openedJobList?.results : state.closedJobList?.results), ...action.payload?.results]
            }
            if (action.meta.arg.status == strings.open) {
                state.openedJobList = action.meta.arg.page == 1 ? action.payload : tempArray
            } else if (action.meta.arg.status == strings.close) {
                state.closedJobList = action.meta.arg.page == 1 ? action.payload : tempArray
            }
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

export const { selectedFormDetialsForCreateJobReducers, resetSelectedFormsBillReducer, storeUserInteractionWithBillCreation, storeCreatedBillDetailsForCloseJob, updateSelectedBilllDetials, updateSelectedSignBillListReducer, jobDetailReducer, resetJobDetailReducer } = jobListSlice.actions
export default jobListSlice.reducer