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
    selectperticularAddress: 'source' | 'destination' | "waypoints" | null
    createJobLocation: LocationData | undefined
}

const initialState: initialStateTypes = {
    job_location: undefined,
    routeList: [],
    source: undefined,
    destination: undefined,
    finalJobRouteList: [],
    selectperticularAddress: null,
    createJobLocation: undefined
}

const USER = "USER";

const MapSlice = createSlice({
    name: USER,
    initialState,
    reducers: {
        setJobLocation: (state, action) => {
            state.job_location = action.payload
        },
        resetMapRoutesReducer: (state) => {
            state.source = undefined
            state.destination = undefined
            state.routeList = []
            state.finalJobRouteList = []
        },
        resetCreateJobLocationReducer: (state) => {
            state.createJobLocation = undefined
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
            console.log({ condition: action.payload?.isCheckBlank })
            if (!action.payload?.isCheckBlank ? (state.selectperticularAddress == 'source') : (!state.source)) {
                state.source = action.payload
            } else if (!action.payload?.isCheckBlank ? (state.selectperticularAddress == 'destination') : (!state.destination)) {
                state.destination = action.payload
            } else if (!action.payload?.isCheckBlank ? (state.selectperticularAddress == 'waypoints') : true) {
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
        },
        updatePerticularSelectionOfAddress: (state, action) => {
            state.selectperticularAddress = action.payload
        },
        storeCreateJoblocationReducer: (state, action) => {
            console.log("storeCreateJoblocation", { action })
            state.createJobLocation = action?.payload
        }
    },
})

export const { setJobLocation, manageMapRoutesReducer, resetMapRoutesReducer, resetPerticularRoutesReducer, updateFinalMapRoutesReducer, updatePerticularSelectionOfAddress, storeCreateJoblocationReducer, resetCreateJobLocationReducer } = MapSlice.actions
export default MapSlice.reducer;