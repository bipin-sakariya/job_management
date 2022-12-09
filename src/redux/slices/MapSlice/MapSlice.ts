import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native";

export interface LocationData {
    latitude: number
    longitude: number
}

interface initialStateTypes {
    job_location: LocationData | undefined
}

const initialState: initialStateTypes = {
    job_location: undefined,
}

const USER = "USER";

const MapSlice = createSlice({
    name: USER,
    initialState,
    reducers: {
        resetJobLocation: (state) => {
            state.job_location = undefined
        },
        setJobLocation: (state, action) => {
            state.job_location = action.payload
        }
    },
})

export const { setJobLocation, resetJobLocation } = MapSlice.actions
export default MapSlice.reducer;