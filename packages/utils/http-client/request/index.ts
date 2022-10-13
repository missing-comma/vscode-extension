import axios, { AxiosRequestConfig } from 'axios';
import { HttpResponse, HttpRequestConfig } from '../types';
import { HttpRequestHelpers } from './helpers';
import { handleHttpResponseError } from './handle-response-error';
import { ErrorHandlerComposer, ErrorHandlerResult } from './error-result-handler';

export class HttpRequest<Data = any> extends HttpRequestHelpers<Data> {
	public static with = <Data>(config: HttpRequestConfig<Data>) => ({
		compose: (request: (config: AxiosRequestConfig<any> | undefined) => Promise<any>) =>
			new HttpRequest<Data>(config, request),
	});

	public cancel = () => {
		this.cancelTokenSource.cancel();
	};

	public start = (): Promise<HttpResponse<Data> | null> & { cancel(): void } => {
		return Object.assign(this.startWrapper(), { cancel: () => this.cancel() });
	};

	private startWrapper = async (): Promise<HttpResponse<Data> | null> => {
		try {
			const response = await this.builder(this.config);
			return this.parseResponse(response);
		} catch (err) {
			const result = this.handleError(err);
			if (!result.handled) {
				throw err;
			}
			return result.response;
		}
	};

	private handleError = (err: unknown): ErrorHandlerResult => {
		const result = new ErrorHandlerComposer();
		const { onCancel, onError } = this.config;

		if (axios.isCancel(err) && onCancel) {
			onCancel();
			return result.wasHandled();
		}
		if (err instanceof Error) {
			if (axios.isAxiosError(err)) {
				if (err.response) {
					const response = this.parseResponse(err.response);
					result.response = response;
					const handled = handleHttpResponseError(err as any, response, this.config);
					if (handled) return result.wasHandled();
				}
			}
			if (onError) {
				onError(err);
				return result.wasHandled();
			}
		}
		return result;
	};
}
