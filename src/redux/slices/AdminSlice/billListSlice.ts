import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";
import { FormDataTypes } from "./formListSlice";

export interface billData {
    id: number,
    created_at: string,
    updated_at: string,
    name: string,
    type_counting: string,
    jumping_ration: Double,
    quantity?: number,
    measurement?: number,
    image: string,
    type: string
}

interface billDataProps {
    count: number,
    next: string | null,
    previous: string | null,
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
    data?: FormDataTypes | FormData,
    page?: number,
    bill_type?: string,
    search?: string
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

export const billList = createAsyncThunk<billDataProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (BILL + "/billList", async (params, { rejectWithValue }) => {
        try {
            let urlParams = new URLSearchParams({ page: params.page ? params.page.toString() : '', bill_type: params.bill_type ? params.bill_type : '' })
            params.search && urlParams.append('search', params.search)
            const response = await axiosClient.get(ApiConstants.BILL + "?" + urlParams.toString())
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const billCreate = createAsyncThunk<billData, FormData, { rejectValue: apiErrorTypes }>
    (BILL + "/billCreate", async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.BILL, params)
            return response.data
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const billDelete = createAsyncThunk<string, number, { rejectValue: apiErrorTypes }>(BILL + "/billDelete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.delete(ApiConstants.BILL + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const billDetail = createAsyncThunk<billData, number, { rejectValue: apiErrorTypes }>(BILL + "/billDetail", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.get(ApiConstants.BILL + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const billUpdate = createAsyncThunk<billData, paramsTypes, { rejectValue: apiErrorTypes }>(BILL + "/billUpdate", async (params, { rejectWithValue }) => {
    try {
        const response = await axiosClient.patch(ApiConstants.BILL + params.id + '/', params.data)
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
        resetBillDetails: (state,) => {
            state.billDetails = {
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
    },
    extraReducers(builder) {
        builder.addCase(billList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billList.fulfilled, (state, action) => {
            state.isLoading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.billListData?.results), ...action.payload?.results]
            }
            state.billListData = action.meta.arg.page == 1 ? action.payload : tempArray
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
            state.isLoading = false
            state.billListData = { ...state.billListData, results: state.billListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(billDelete.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(billDetail.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.billDetails = action.payload
            state.error = ''
        });
        builder.addCase(billDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(billUpdate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(billUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(billUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
    }
})

export const { resetBillDetails } = billListSlice.actions
export default billListSlice.reducer