import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, AxiosError } from 'axios';

export interface HttpResponse<D> {
	readonly headers: AxiosResponseHeaders;
	readonly success: boolean;
	readonly data: D;
	readonly message: string;
}

export type RequestBuilder<Data> = (
	config: HttpRequestConfig<Data>
) => Promise<AxiosResponse<Data>>;

export interface AxiosResponseError<Data = any> extends Omit<AxiosError, 'response'> {
	response: AxiosResponse<Data>;
}

export interface OnResponseError<Data> {
	(response: HttpResponse<Data>, error: AxiosResponseError<Data>): void;
}

export interface HttpRequestConfig<Data = any>
	extends AxiosRequestConfig,
		HttpRequestConfig.Pure<Data> {}
export declare namespace HttpRequestConfig {
	export interface Pure<Data> {
		onBadRequest?: OnResponseError<Data>;
		onFailure?: OnResponseError<Data>;
		onUnauthenticated?: OnResponseError<Data>;
		onUnauthorized?: OnResponseError<Data>;
		onServerError?: OnResponseError<Data>;
		onError?(error: Error | AxiosResponseError<Data>): void;
		onCancel?(): void;
	}

	export type EveryPure<Data> = { [K in keyof Pure<Data>]: Pure<Data>[K] | undefined };
}
