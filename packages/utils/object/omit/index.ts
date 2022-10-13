import { omit as R_omit } from 'ramda';

/**
 * Picks an array of properties from an object.
 *
 * Same behaviour as [R.omit]
 *
 * @param {T} obj is the source object
 * @param {Array<keyof T>} names are the properties to be omitted from the source obj.
 *
 * @return {Pick<T, Extract<keyof T, K>>} a new object without the omitted properties from the source object.
 */
export function omit<T, K extends keyof T>(
	obj: T,
	...names: readonly K[]
): Omit<T, Extract<keyof T, K>> {
	return R_omit(names as any[], obj) as any;
}

export { omit as objectOmit };
