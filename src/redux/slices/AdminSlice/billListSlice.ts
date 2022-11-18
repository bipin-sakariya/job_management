import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";

export interface billData {
    id: number,
    created_at: string,
    updated_at: string,
    name: string,
    type_counting: string,
    jumping_ration: Double,
    quantity: number,
    image: string,
    type: string
}

interface billDataProps {
    count: number,
    next: string | undefined | null,
    previous: string | undefined | null,
    results: billData[]
}

interface initialState {
    isLoading: boolean
    error: object | string | undefined
    billListData: billDataProps,
    billDetails: billData
}

interface paramsTypes {
    id?: number
    data?: FormData,
    page?: undefined | number,
    bill_type?: string
}

const initialState: initialState = {
    isLoading: false,
    error: '',
    billListData: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    billDetails: {
        id: 0,
        created_at: '',
        updated_at: '',
        name: '',
        type_counting: '',
        jumping_ration: 0,
        quantity: 0,
        image: '',
        type: ''
    }
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const BILL = "BILL";

export const billList = createAsyncThunk
    (BILL + "/billList", async (params: paramsTypes, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: billListSlice.ts ~ line 60 ~ params", params)
            console.log(ApiConstants.BILLLIST)
            const response = await axiosClient.get(ApiConstants.BILLLIST + `?page=${params.page}&bill_type=${params.bill_type}`)
            console.log("🚀 ~ file: billListSlice.ts ~ line 69 ~ response", response)
            return response;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const billCreate = createAsyncThunk<string[], FormData, { rejectValue: apiErrorTypes }>
    (BILL + "/billCreate", async (params, { rejectWithValue }) => {
        try {
            console.log(ApiConstants.BILLCREATE)
            const response = await axiosClient.post(ApiConstants.BILLCREATE, params)
            console.log("🚀 ~ file: billListSlice.ts ~ line 69 ~ response", response)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const billDelete = createAsyncThunk<string, paramsTypes, { rejectValue: apiErrorTypes }>(BILL + "/billDelete", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.BILLDELETE, params)
        const response = await axiosClient.delete(ApiConstants.BILLDELETE + params.id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const billDetails = createAsyncThunk<billData, paramsTypes, { rejectValue: apiErrorTypes }>
    (BILL + "/billDetails", async (params, { rejectWithValue }) => {
        try {
            console.log(ApiConstants.BILLDELETE, params)
            const response = await axiosClient.get(ApiConstants.BILLDELETE + params.id + '/')
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

const billListSlice = createSlice({
    name: BILL,
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(billList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray: billDataProps = action.meta.arg.page == 1 ? [] : {
                ...action.payload.data,
                results: [...current(state.billListData?.results), ...action.payload?.data?.results]
            }
            state.billListData = action.meta.arg.page == 1 ? action.payload.data : tempArray
            state.error = ''
        });
        builder.addCase(billList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(billCreate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billCreate.fulfilled, (state, action) => {
            console.log("🚀 ~ file: billListSlice.ts ~ line 139 ~ builder.addCase ~ action", action)
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(billCreate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(billDelete.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billDelete.fulfilled, (state, action) => {
            console.log("🚀 ~ file: billListSlice.ts ~ line 139 ~ builder.addCase ~ action", action)
            state.isLoading = false
            state.billListData = { ...state.billListData, results: state.billListData.results.filter(i => i.id !== action.meta.arg.id) }
            state.error = ''
        });
        builder.addCase(billDelete.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(billDetails.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billDetails.fulfilled, (state, action) => {
            console.log("🚀 ~ file: billListSlice.ts ~ line 139 ~ builder.addCase ~ action", action)
            state.isLoading = false
            state.billDetails = action.payload
            state.error = ''
        });
        builder.addCase(billDetails.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

    }
})
export default billListSlice.reducer