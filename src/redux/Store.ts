import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import AuthUserSlice from './slice/authSlices/AuthUserSlice';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const reducers = combineReducers({
    userDetails: AuthUserSlice,
})


const rootReducer = (state: any, action: any) => {
    if (action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        return reducers(undefined, action)
    }
    return reducers(state, action)
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;