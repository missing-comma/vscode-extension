import { mergeHttpRequestConfig } from './helpers';
import { LoadHttpClientHelpers } from './load-helpers';
import { HttpRequest } from './request';
import { HttpRequestConfig } from './types';

export class LoadHttpClient extends LoadHttpClientHelpers {
	public instance = (config: HttpRequestConfig<unknown>) => {
		return new LoadHttpClient(mergeHttpRequestConfig(this.config, config));
	};

	public get = <Data = any>(url: string, config: HttpRequestConfig<Data> = {}) => {
		return new HttpRequest<Data>(config, (next) => this.client.get(url, next)).start();
	};

	public post = <Data = any>(url: string, data?: any, config: HttpRequestConfig<Data> = {}) => {
		return new HttpRequest<Data>(config, (next) => this.client.post(url, data, next)).start();
	};

	public put = <Data = any>(url: string, config: HttpRequestConfig<Data> = {}) => {
		return new HttpRequest<Data>(config, (next) => this.client.put(url, next)).start();
	};

	public delete = <Data = any>(url: string, config: HttpRequestConfig<Data> = {}) => {
		return new HttpRequest<Data>(config, (next) => this.client.delete(url, next)).start();
	};
}
