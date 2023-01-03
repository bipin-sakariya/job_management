import axios from 'axios';
import { store } from '../redux/Store';
import { ApiConstants } from './ApiConstants';
import { APP_URL } from './Host';

export const axiosClient = axios.create({
	baseURL: APP_URL,
});

const blacklistUrls = [
	ApiConstants.LOGIN
];

axiosClient.interceptors.request.use(async (config) => {
	try {
		const token = store.getState().userDetails.token?.access

		if (token && !blacklistUrls.includes(config.url || '')) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`
			}
		}
		if (config.method === "post" || config.method == "patch") {
			config.headers = {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			};
		} else if (config.method == "put") {
			config.headers = {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			};
		}

		if ((config.url?.includes(ApiConstants.GROUPLIST)) && config.method == 'patch') {
			config.headers = {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			};
		}
		if ((config.url === ApiConstants.FORMS || config.url === ApiConstants.TRANSFERJOB || config.url === ApiConstants.RETURNJOB) && config.method === 'post' || config.method == "put") {
			config.headers = {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			};
		}


	} catch (e) {
		console.error({ e });
	}
	return config;
});
