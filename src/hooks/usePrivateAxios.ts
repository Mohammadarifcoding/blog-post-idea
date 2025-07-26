import axios from 'axios';
import useAxios from './useAxios';
import { Auth, logout, setAuth } from '../stores/auth';
import { get } from 'svelte/store';
import { onDestroy } from 'svelte';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
	timeout: 5000
});

const usePrivateAxios = () => {
	const axiosPublic = useAxios();
	const { token, refreshToken, user } = get(Auth);

	const requestInterceptor = instance.interceptors.request.use(
		(config) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
	const responseInterceptor = instance.interceptors.response.use(
		(res) => res,
		async (error) => {
			const originalRequest = error.config;

			if (error?.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					const response = await axiosPublic.post('/auth/refresh-token', {
						refreshToken
					});
					const newToken = response.data.token;

					setAuth({
						user: user,
						token: newToken,
						refreshToken,
						loading: false
					});

					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return instance(originalRequest);
				} catch (refreshError) {
					logout();
					return Promise.reject(refreshError);
				}
			}

			return Promise.reject(error);
		}
	);
	onDestroy(() => {
		instance.interceptors.request.eject(requestInterceptor);
		instance.interceptors.response.eject(responseInterceptor);
	});
	return instance;
};
export default usePrivateAxios;
