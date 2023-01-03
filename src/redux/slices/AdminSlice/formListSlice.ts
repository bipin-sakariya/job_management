import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";
import { billData } from "./billListSlice";

export interface FormDataTypes {
    id: number,
    bill: billData[],
    created_at: string,
    updated_at: string,
    name: string,
    is_sign?: boolean
}

interface FormDataProps {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: FormDataTypes[]
}

interface InitialState {
    isLoading: boolean
    error: object | string | undefined
    formListData: FormDataProps,
    formDetails: FormDataTypes
}

interface paramsTypes {
    id?: number
    data?: FormDataTypes,
    page?: number,
    name?: string,
    bill?: number[],
    search?: string,
    is_sign?: boolean
}

const initialState: InitialState = {
    isLoading: false,
    error: '',
    formListData: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    formDetails: {
        id: 0,
        bill: [],
        created_at: '',
        updated_at: '',
        name: '',
    }
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

const FORM = "FORM";

export const formList = createAsyncThunk<FormDataProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (FORM + "/formList", async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.FORMS + `?page=${params.page}&search=${params.search}`)
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const formDetail = createAsyncThunk<FormDataTypes, number, { rejectValue: apiErrorTypes }>(FORM + "/formDetail", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.get(ApiConstants.FORMS + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const formDelete = createAsyncThunk<string, number, { rejectValue: apiErrorTypes }>(FORM + "/formDelete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosClient.delete(ApiConstants.FORMS + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const formCreate = createAsyncThunk<FormDataTypes, paramsTypes, { rejectValue: apiErrorTypes }>(FORM + "/formCreate", async (params, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post(ApiConstants.FORMS, params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const formUpdate = createAsyncThunk<FormDataTypes, paramsTypes, { rejectValue: apiErrorTypes }>(FORM + "/formUpdate", async (params, { rejectWithValue }) => {
    try {
        const response = await axiosClient.patch(ApiConstants.FORMS + params.id + '/', params)
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

const formListSlice = createSlice({
    name: FORM,
    initialState,
    reducers: {
        formDetails: (state,) => {
            state.formDetails = {
                id: 0,
                bill: [],
                created_at: '',
                updated_at: '',
                name: '',
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(formList.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(formList.fulfilled, (state, action) => {
            state.isLoading = false
            // state.formListData = action.payload.results
            let tempArray: FormDataProps = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.formListData?.results), ...action.payload?.results]

            }
            state.formListData = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ''
        });
        builder.addCase(formList.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(formDetail.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(formDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.formDetails = action.payload
            state.error = ''
        });
        builder.addCase(formDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(formDelete.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(formDelete.fulfilled, (state, action) => {
            state.isLoading = false
            state.formListData = { ...state.formListData, results: state.formListData.results.filter(i => i.id !== action.meta.arg) }
            state.error = ''
        });
        builder.addCase(formDelete.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(formCreate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(formCreate.fulfilled, (state, action) => {
            state.isLoading = false
            // state.formListData = action.payload
            state.error = ''
        });
        builder.addCase(formCreate.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload?.data
        });
        builder.addCase(formUpdate.pending, state => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(formUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(formUpdate.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
    }
})

export const { formDetails } = formListSlice.actions
export default formListSlice.reducer