/**
 * Split one object into two based on the keys received
 *
 * @param {T} src source object
 * @param {...K[]} keys array of keys to use to split the source object
 *
 * @return {[Pick<T, K>, Omit<T, K>]} an array when the first element is a new object
 * with only the keys received by the function, and the second is another new object, but without
 * the keys received by the function
 */
export function split<T, K extends keyof T>(src: T, ...keys: K[]): [Pick<T, K>, Omit<T, K>] {
	const pick: any = {};
	const omit: any = {};

	Object.keys(src).forEach((key: any) => {
		if (keys.includes(key)) {
			pick[key] = (src as any)[key];
		} else {
			omit[key] = (src as any)[key];
		}
	});

	return [pick, omit];
}

export { split as objectSplit };
