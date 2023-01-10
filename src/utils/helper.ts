import moment, { Moment } from "moment";
import jwt_decode from 'jwt-decode';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ToastShowParams } from "react-native-toast-message";
import { store, USER_LOGOUT } from "../redux/Store";
import { navigationRef } from "./NavigationServices";

export const getDifferenceInDays = (date: Date) => {
    let diffrence = new Date(date).valueOf() - new Date().valueOf()
    const diffInMs = Math.abs(diffrence);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const seconds = Math.floor(diffInMs / 1000);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);

    if (days < 1) {
        if (hours < 1) {
            if (minutes < 1) {
                return `${seconds}s ago`;
            } else {
                return `${minutes}m ago`;
            }
        } else {
            return `${hours}h ago`;
        }
    } else {
        if (days > 31) {
            if (months > 12) {
                return `${years}y ago`;
            } else {
                return `${months}M ago`;
            }
        } else {
            return `${days}d ago`;
        }
    }
};

const showToast = (params: ToastShowParams) => {
    Toast.hide();
    Toast.show({ ...params, type: 'appToast' });
};

interface TokenType {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
}

const parseJWTTokenExpiry = (_token: string): Moment => {
    let decodedToken: TokenType = jwt_decode(_token);
    console.log({ decodedToken })
    return moment.unix(decodedToken?.exp);
};

export const sessionExpiryHandler = (token: string, controller?: AbortController) => {
    controller && controller.abort();
    const expiryTime = parseJWTTokenExpiry(token);
    const currentTime = Date.now();
    if (moment(currentTime).isSameOrAfter(expiryTime)) {
        showToast({
            text1: 'Your Session has expired! Please login again',
            autoHide: false,
        });
        store.dispatch({ type: USER_LOGOUT });
        navigationRef?.current?.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
    }
};