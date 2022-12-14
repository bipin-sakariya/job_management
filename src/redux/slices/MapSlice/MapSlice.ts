import { AnyAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { Alert } from "react-native";
import { string } from "yup";
import { roleList } from "../AdminSlice/userListSlice";

export interface LocationData {
    id: number
    address?: string
    description?: string
    coordinates: {
        latitude: number
        longitude: number
    },
    status?: string,
}

interface initialStateTypes {
    job_location: LocationData | undefined,
    routeList: LocationData[] | [],
    source: LocationData | undefined,
    destination: LocationData | undefined
    finalJobRouteList: LocationData[] | []
}

const initialState: initialStateTypes = {
    job_location: undefined,
    routeList: [],
    source: undefined,
    destination: undefined,
    finalJobRouteList: []
}

const USER = "USER";

const MapSlice = createSlice({
    name: USER,
    initialState,
    reducers: {
        // resetJobLocation: (state) => {
        //     state.job_location = undefined
        // },
        setJobLocation: (state, action) => {
            state.job_location = action.payload
        },
        // resetRouteList: (state) => {
        //     state.routeList = []
        // },
        // setSource: (state, action) => {
        //     console.log("state===>", action.payload)
        //     state.routeList = action.payload
        // },
        // setDestination: (state, action) => {
        //     state.routeList = action.payload
        // },
        // setRouteList: (state, action) => {
        //     let temp = action.payload
        //     console.log("STATE", temp)
        //     state.routeList = action.payload
        // },
        resetMapRoutesReducer: (state) => {
            state.source = undefined
            state.destination = undefined
            state.routeList = []
        },
        resetPerticularRoutesReducer: (state, action) => {
            if (action.payload?.type == 'source') {
                state.source = undefined
            } else if (action.payload?.type == 'destination') {
                state.destination = undefined
            } else if (action.payload?.type == 'waypoints') {
                console.log({ action: action.payload })
                let latestRoutes = state.routeList.filter((i) => i.id != action.payload?.id)
                state.routeList = latestRoutes
            }
        },
        manageMapRoutesReducer: (state, action) => {
            console.log({ action, state })
            if (!state.source) {
                state.source = action.payload
            } else if (!state.destination) {
                state.destination = action.payload
            } else {
                let routeList: LocationData[] = [...current(state.routeList), action.payload]
                console.log({ routeList })
                if (routeList.length <= 8) {
                    state.routeList = routeList
                }
            }
        },
        updateFinalMapRoutesReducer: (state) => {
            let finalRoutes = []
            state.source && finalRoutes.push(current(state.source))
            state.routeList && finalRoutes.push(...current(state.routeList))
            state.destination && finalRoutes.push(current(state.destination))
            state.finalJobRouteList = finalRoutes
        }
    },
})

export const { setJobLocation, manageMapRoutesReducer, resetMapRoutesReducer, resetPerticularRoutesReducer, updateFinalMapRoutesReducer } = MapSlice.actions
export default MapSlice.reducer;