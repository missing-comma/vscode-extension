import { Prepend } from './types/prepend';

const prependFn = <
	Src extends { [K in string]: any },
	K extends string,
	JoinKey extends string = '.'
>(
	key: K,
	src: Src,
	joinKey?: JoinKey
): Prepend<Src, K, JoinKey> => {
	const prepended: any = {};
	Object.keys(src).forEach((innerKey) => {
		const newKey = [key, innerKey].join(joinKey || '.');
		prepended[newKey] = src[innerKey];
	});
	return prepended;
};

export const prepend = Object.assign(prependFn, {
	with: <J extends string>(joinKey: J) => {
		return <Src extends { [K in string]: any }, K extends string>(key: K, src: Src) => {
			return prependFn(key, src, joinKey);
		};
	},
});

export { prepend as objectPrepend };
