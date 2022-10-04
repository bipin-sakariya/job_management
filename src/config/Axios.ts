// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
		console.log('AAA config', config)
		// const userString = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);
		if (!blacklistUrls.includes(config.url || '')) {
			config.headers = {
				...config.headers,
				// Authorization: userString ? `JWT ${userString}` : ''
			}
		}
	} catch (e) {
		console.error({ e });
	}
	console.log('AAA final config', config)
	return config;
});
