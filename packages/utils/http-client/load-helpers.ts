import axios, { AxiosInstance } from 'axios';
import { splitHttpRequestConfig } from './helpers';
import { HttpRequestConfig } from './types';

export abstract class LoadHttpClientHelpers {
	protected client!: AxiosInstance;
	protected config!: HttpRequestConfig<unknown>;

	constructor(config: HttpRequestConfig<unknown>) {
		this.withConfig(() => config);
	}

	public withConfig = (
		updator: (prevConfig: HttpRequestConfig<unknown>) => HttpRequestConfig<unknown>
	) => {
		const nextConfig = updator(this.config);
		const { axiosConfig } = splitHttpRequestConfig(nextConfig);

		this.config = nextConfig;
		this.client = axios.create(axiosConfig);
		return this;
	};
}
