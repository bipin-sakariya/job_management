import { APP_URL } from "./Host";

export const ApiConstants = {
	LOGIN: APP_URL + 'auth/signin/',
	RESETPASSWORD: APP_URL + 'auth/reset-password/',
	USERDETAIL: APP_URL + 'users/',
	USERROLELIST: APP_URL + 'users/role/',
	USERSCREATE: APP_URL + 'users/',
	USERSDELETE: APP_URL + 'users/',
	USERSUPDATE: APP_URL + 'users/',
	BILLLIST: APP_URL + 'bills/',
	BILLCREATE: APP_URL + 'bills/',
	BILLDELETE: APP_URL + 'bills/',
	BILLDETALIS: APP_URL + 'bills/',
	BILLUPDATE: APP_URL + 'bills/',
};
