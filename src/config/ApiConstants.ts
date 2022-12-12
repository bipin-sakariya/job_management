import { APP_URL } from "./Host";

export const ApiConstants = {
	LOGIN: APP_URL + 'auth/signin/',
	RESETPASSWORD: APP_URL + 'auth/reset-password/',
	USER: APP_URL + 'users/',
	USERROLELIST: APP_URL + 'users/role/',
	BILL: APP_URL + 'bills/',
	JOB: APP_URL + 'job/',
	GROUPLIST: APP_URL + 'groups/',
	USERGROUPROLELIST: APP_URL + 'users/group/',
	FORMS: APP_URL + 'forms/',
	JOBSTATUSWISE: APP_URL + 'job/group-jobs/',
	RECENTJOBLIST: APP_URL + 'job/recent-add-job/',
};
