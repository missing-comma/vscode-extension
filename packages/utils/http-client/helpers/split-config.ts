import { HttpRequestConfig } from '../types';

export const splitHttpRequestConfig = <Data>(config: HttpRequestConfig<any>) => {
	const { onCancel, onError, onFailure, onUnauthenticated, onUnauthorized, ...axiosConfig } =
		config;
	const requestConfig: HttpRequestConfig.EveryPure<Data> = {
		onCancel,
		onError,
		onFailure,
		onUnauthenticated,
		onUnauthorized,
	};

	return {
		requestConfig,
		axiosConfig,
	};
};
