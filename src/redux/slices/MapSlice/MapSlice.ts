import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Alert } from "react-native";
import { string } from "yup";
import { roleList } from "../AdminSlice/userListSlice";

export interface LocationData {
    latitude: number
    longitude: number
}

interface initialStateTypes {
    job_location: LocationData | undefined,
    routeList: LocationData[] | [],
    source: LocationData | undefined,
    destination: LocationData | undefined
}

const initialState: initialStateTypes = {
    job_location: undefined,
    routeList: [],
    source: undefined,
    destination: undefined,

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
        },
        resetRouteList: (state) => {
            state.routeList = []
        },
        setSource: (state, action) => {
            console.log("state===>", action.payload)
            state.routeList = action.payload
        },
        setDestination: (state, action) => {
            state.routeList = action.payload
        },
        setRouteList: (state, action) => {
            let temp = action.payload
            console.log("STATE", temp)
            state.routeList = action.payload
        },
    },
})

export const { setJobLocation, resetJobLocation, setRouteList, resetRouteList, setSource, setDestination } = MapSlice.actions
export default MapSlice.reducer;