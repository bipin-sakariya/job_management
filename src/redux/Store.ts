import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import AuthUserSlice from './slices/AuthUserSlice';
import userListSlice from './slices/AdminSlice/userListSlice';
import billListSlice from './slices/AdminSlice/billListSlice';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const reducers = combineReducers({
    userDetails: AuthUserSlice,
    userList: userListSlice,
    billList: billListSlice
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


// export type RootState = ReturnType<typeof store.getState>;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch