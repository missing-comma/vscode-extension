import { ArrayOfSize } from '../entities';

export const forceSize = <N extends number, V>(
	amount: N,
	values: readonly V[]
): ArrayOfSize<V, N> => {
	if (values.length !== amount) {
		throw new Error('Invalid array size. Expected ' + amount + ' but got ' + values.length);
	}
	return values as any;
};
