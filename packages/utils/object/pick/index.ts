import { pick as R_pick } from 'ramda';

/**
 * Picks an array of properties from an object.
 *
 * Same behaviour as [R.pick]
 *
 * @param {T} obj is the source object
 * @param {Array<keyof T>} names are the properties to be picked from the source obj.
 *
 * @return {Pick<T, Extract<keyof T, K>>} a new object with only the picked properties from the source object.
 */
export function pick<T, K extends keyof T>(
	obj: T,
	...names: readonly K[]
): Pick<T, Extract<keyof T, K>> {
	return R_pick<any, any>(names, obj);
}

export { pick as objectPick };
