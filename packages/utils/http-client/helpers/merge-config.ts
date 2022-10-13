import { HttpRequestConfig } from '../types';

export const mergeHttpRequestConfig = <D1 = any, D2 = any>(
	c1: HttpRequestConfig<D1>,
	c2: HttpRequestConfig<D1>
): HttpRequestConfig<D1 | D2> => {
	return { ...c1, ...c2 } as any;
};
