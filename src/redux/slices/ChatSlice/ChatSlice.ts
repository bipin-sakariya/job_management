import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ApiConstants } from "../../../config/ApiConstants";
import { axiosClient } from "../../../config/Axios";
import { MessageListProps, MessageProps } from "../../../types/commanTypes";

export interface ChatList {
    id: number,
    group: groupDetailsProps,
    message: string | null,
    created_at: string,
    created_by: number,
    badge: number | null
}

export interface groupDetailsProps {
    id: number,
    name: string,
    image: string,
}
interface ChatListDataProps {
    count: number,
    next: string | null,
    previous: string | null,
    results: ChatList[]
}

interface initialStateTypes {
    loading: boolean,
    chatList: ChatListDataProps,
    messageList: MessageListProps,
    error: string
}

export interface apiErrorTypes {
    data: {
        detail?: string,
    }
}

interface paramsTypes {
    id?: number
    page?: number,
    search?: string
}

const initialState: initialStateTypes = {
    loading: false,
    error: '',
    chatList: {
        count: 0,
        next: '',
        previous: '',
        results: []
    },
    messageList: {
        count: 0,
        next: '',
        previous: '',
        results: []
    },
}


const CHAT = "CHAT";

export const chatListDetails = createAsyncThunk<ChatListDataProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (CHAT + "/chatList", async (params, { rejectWithValue }) => {
        try {
            let urlParams = new URLSearchParams({ page: params.page ? params.page.toString() : '' })
            params.search && urlParams.append('search', params.search)
            const response = await axiosClient.get(ApiConstants.CHAT + "?" + urlParams.toString())
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })

export const messageListDetails = createAsyncThunk<MessageListProps, paramsTypes, { rejectValue: apiErrorTypes }>
    (CHAT + "/messageList", async (params, { rejectWithValue }) => {
        try {
            let urlParams = new URLSearchParams({ page: params.page ? params.page.toString() : '' })
            const response = await axiosClient.get(ApiConstants.CHAT + params.id + "/?" + urlParams.toString())
            return response.data;
        } catch (e: any) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message)
            }
            return rejectWithValue(e?.response)
        }
    })


const ChatSlice = createSlice({
    initialState,
    name: CHAT,
    reducers: {},
    extraReducers: (builder) => {
        /// chat list
        builder.addCase(chatListDetails.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(chatListDetails.fulfilled, (state, action) => {
            state.loading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.chatList?.results), ...action.payload?.results]
            }
            state.chatList = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ""
        })
        builder.addCase(chatListDetails.rejected, (state, action) => {
            state.loading = false
            state.error = ""
        })
        /// message list
        builder.addCase(messageListDetails.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(messageListDetails.fulfilled, (state, action) => {
            state.loading = false
            let tempArray = action.meta.arg.page == 1 ? action.payload : {
                ...action.payload,
                results: [...current(state.messageList?.results), ...action.payload?.results]
            }
            state.messageList = action.meta.arg.page == 1 ? action.payload : tempArray
            state.error = ""
        })
        builder.addCase(messageListDetails.rejected, (state, action) => {
            state.loading = false
            state.error = ""
        })
    },
})

export default ChatSlice.reducer;