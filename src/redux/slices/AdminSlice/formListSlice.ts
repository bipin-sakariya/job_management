import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";

export interface FormData {
    id: number,
    bill: [],
    created_at: string,
    updated_at: string,
    name: string,
    is_sign?: boolean
}

interface FormDataProps {
    count: number,
    next?: string | null,
    previous?: string | null,
    results: FormData[]
}

interface InitialState {
    isLoading: boolean
    error: object | string | undefined
    formListData: FormDataProps,
    formDetails: FormData
}

interface paramsTypes {
    id?: number
    data?: FormData,
    page?: undefined | number,
    name?: string,
    bill?: [],
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

export const formList = createAsyncThunk
    (FORM + "/groupList", async (params: paramsTypes, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ file: groupListSlice.ts ~ line 60 ~ params", params)
            console.log(ApiConstants.FORMS)
            const response = await axiosClient.get(ApiConstants.FORMS + `?page=${params.page}`)
            console.log("🚀 ~ file: groupListSlice.ts ~ line 69 ~ response", response)
            return response;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const formDetail = createAsyncThunk<FormData, number, { rejectValue: apiErrorTypes }>(FORM + "/formDetail", async (id, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.FORMS, id)
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
        console.log(ApiConstants.FORMS, id)
        const response = await axiosClient.delete(ApiConstants.FORMS + id + '/')
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const formCreate = createAsyncThunk<FormData, paramsTypes, { rejectValue: apiErrorTypes }>(FORM + "/jobCreate", async (params, { rejectWithValue }) => {
    let obj = {
        name: params.name,
        bill: [20],//.toString(),
        is_sign: false//params.is_sign
    }
    try {
        console.log(ApiConstants.FORMS, { obj })
        const response = await axiosClient.post(ApiConstants.FORMS, obj)
        console.log('data...........=====', { response: response })
        return response.data
    } catch (e: any) {
        if (e.code === "ERR_NETWORK") {
            Alert.alert(e.message)
        }
        return rejectWithValue(e?.response)
    }
})

export const formUpdate = createAsyncThunk<FormData, paramsTypes, { rejectValue: apiErrorTypes }>(FORM + "/formUpdate", async (params, { rejectWithValue }) => {
    try {
        console.log(ApiConstants.FORMS, params)
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
            let tempArray: FormDataProps = action.meta.arg.page == 1 ? [] : {
                ...action.payload.data,
                results: [...current(state.formListData?.results), ...action.payload?.data?.results]
            }
            state.formListData = action.meta.arg.page == 1 ? action.payload.data : tempArray
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