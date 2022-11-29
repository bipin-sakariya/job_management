import { APP_URL } from "./Host";

export const ApiConstants = {
	LOGIN: APP_URL + 'auth/signin/',
	RESETPASSWORD: APP_URL + 'auth/reset-password/',
	USER: APP_URL + 'users/',
	USERROLELIST: APP_URL + 'users/role/',
	BILL: APP_URL + 'bills/',
	JOB: APP_URL + 'job/',
	GROUPLIST: APP_URL + 'groups/',
	USERINSPECTORLIST: APP_URL + 'users/inspector/',
	USERGROUPMANAGERLIST: APP_URL + 'users/group_manager/',
};
