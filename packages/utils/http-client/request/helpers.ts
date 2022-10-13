import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { mergeHttpRequestConfig } from '../helpers/merge-config';
import { RequestBuilder, HttpResponse, HttpRequestConfig } from '../types';

export abstract class HttpRequestHelpers<Data> {
	public readonly config: HttpRequestConfig<Data>;
	protected readonly cancelTokenSource: CancelTokenSource;

	constructor(config: HttpRequestConfig<any>, protected readonly builder: RequestBuilder<Data>) {
		this.cancelTokenSource = axios.CancelToken.source();

		this.config = mergeHttpRequestConfig(config, {
			cancelToken: this.cancelTokenSource.token,
		});
	}

	protected parseResponse = (response: AxiosResponse<any>): HttpResponse<Data> => {
		return {
			headers: response.headers,
			success: [200, 201].includes(response.status),
			data: response.data,
			message: response.statusText,
		};
	};
}
