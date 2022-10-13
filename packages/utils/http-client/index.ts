import { LoadHttpClient } from './load';
import { HttpRequest } from './request';
import { AxiosResponseError as AxResponseError, HttpRequestConfig, HttpResponse } from './types';

export class HttpClient extends LoadHttpClient {}

export declare namespace HttpClient {
	export type AxiosResponseError<Data> = AxResponseError<Data>;

	export type RequestConfig<Data> = HttpRequestConfig<Data>;
	export type Response<Data> = HttpResponse<Data>;

	export type Instance = HttpClient;

	export type Request<Data> = HttpRequest<Data>;
}
