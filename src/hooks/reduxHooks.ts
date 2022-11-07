import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/Store";


export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch