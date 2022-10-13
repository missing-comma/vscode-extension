import { HttpRequestConfig, HttpResponse, AxiosResponseError, OnResponseError } from '../types';

export const handleHttpResponseError = (
	error: AxiosResponseError,
	response: HttpResponse<any>,
	config: HttpRequestConfig.Pure<any>
): boolean => {
	const { onFailure, onUnauthenticated, onUnauthorized, onBadRequest, onServerError } = config;

	const all: Record<number, OnResponseError<any> | undefined> = {
		400: onBadRequest,
		401: onUnauthenticated,
		403: onUnauthorized,
		500: onServerError,
	};

	if (error.response.status in all) {
		const callback = all[error.response.status];
		if (callback) {
			callback(response, error);
			return true;
		}
	}

	if (onFailure) {
		onFailure(response, error);
		return true;
	}

	return false;
};
