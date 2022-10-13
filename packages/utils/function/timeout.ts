/**
 * A function that returns a promise that may rejects after a given time, if the timeout is reached
 */
export type TimeoutableFunction<A extends any[] = any[], R = any> = (...args: A) => Promise<R>;

/**
 * A function that returns a promise that rejects after a given time
 *
 * @param {number} timeout the timeout in milliseconds until the promise rejects
 *
 * @returns {Promise<never>}
 *
 * @throws {Error} when the timeout is reached
 */
const makeTimeoutPromise = async (timeout: number): Promise<never> => {
	await new Promise((r) => setTimeout(r, timeout));
	throw new Error('Timeout');
};

/**
 * Wraps an async function with a timeout.
 *
 * [WARNING] If the timeout is reached, an error with be thrown. But javascript CANNOT stop the execution of a promise.
 * If we need this behaviour, we would need to install Bluebird or something similar.
 *
 *
 * @param {TimeoutableFunction<A, R>} func is the function to be executed
 * @param {number} timeout the timeout in milliseconds the function has to resolve
 *
 * @returns {TimeoutableFunction<A, R>} the function received but wrapped with a timeout. The returned function
 * will have the same name of the original function (or 'anyonymous' if the original function has no name) but appended with: '_withTimeout'
 *
 * @example {wrapFunctionWithTimeout(foo, 1000)} // returns a function that will execute foo but will reject after 1000ms if it doesn't resolve
 * @example {wrapFunctionWithTimeout(foo, 1000).name}  // returns 'foo_withTimeout'
 *
 */
export const wrapFuncWithTimeout = <F extends TimeoutableFunction>(func: F, timeout: number): F => {
	const name = (func.name || 'anonymous') + '_withTimeout';
	return {
		[name]: async (...args: Parameters<F>): Promise<ReturnType<F>> => {
			return Promise.race([func(...args), makeTimeoutPromise(timeout)]);
		},
	}[name] as F;
};
