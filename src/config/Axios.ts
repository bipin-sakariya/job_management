// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { store } from '../redux/Store';
// import { StorageKeys } from '../Utils/StorageKeys';
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
		console.log("🚀 ~ file: Axios.ts ~ line 18 ~ axiosClient.interceptors.request.use ~ config", config)
		console.log('AAA config', config)
		// const userString = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);
		const token = store.getState().userDetails.token?.access

		if (token && !blacklistUrls.includes(config.url || '')) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`
			}
		}
		// if (config.method == "post") {
		// }else if(config.method == "")
	} catch (e) {
		console.error({ e });
	}
	console.log('AAA final config', config)
	return config;
});
