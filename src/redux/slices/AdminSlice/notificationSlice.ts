import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { boolean } from "yup";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";
import { apiErrorTypes } from "../AuthUserSlice";
import { Added_byData, JobDetailsData } from './jobListSlice'


export interface NotificationObjectType {
    created_at: string
    created_by: number
    id?: number
    job?: number
    jobs?: {
        address: string
        images: [{ image: string }]

    }
    message: string
    notification_type?: 'Close' | 'Open' | 'Transfer' | 'Further_Inspection'
    receiver: number
    sender: number
    senders: {
        date_joined?: string
        email?: string
        id?: number
        is_active?: boolean
        phone?: number
        profile_image?: string
        role?: { id?: number, title?: string }
        user_name?: string
    }
    updated_at: string
    updated_by: number
    date_joined: string
}

interface NotificationResponse {
    count: number | null
    next: string | null
    previous: string | null
    results: NotificationObjectType[]
}


interface initialState {
    notificationData: NotificationResponse
    isLoading: boolean,
}

const initialState: initialState = {
    isLoading: false,
    notificationData: {
        count: null,
        next: null,
        previous: null,
        results: []
    },
}

interface params {
    page?: number | undefined
}

const NOTIFICATION = 'NOTIFICATION'

export const getNotificatioList = createAsyncThunk<NotificationResponse, params, { rejectValue: apiErrorTypes }>
    (NOTIFICATION + '/getNotificatioList', async (params, { rejectWithValue }) => {
        try {
            const urlParams = new URLSearchParams({ page: params.page ? params.page?.toString() : '' })
            const response = await axiosClient.get(ApiConstants.NOTIFICATION_LIST + "?" + urlParams.toString())
            return response.data
        } catch (e: any) {
            return rejectWithValue(e)
        }
    })




const notificationSlice = createSlice({
    initialState,
    name: NOTIFICATION,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getNotificatioList.pending, (state, action) => {
            state.isLoading = true
        })
        addCase(getNotificatioList.fulfilled, (state, action) => {
            state.isLoading = false
            state.notificationData = action.meta.arg.page == 1 ? action.payload : { ...action.payload, results: [...current(state.notificationData.results), ...action.payload.results], }
        })
        addCase(getNotificatioList.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})


export const { } = notificationSlice.actions;
export default notificationSlice.reducer