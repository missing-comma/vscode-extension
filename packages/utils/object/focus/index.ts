import { omit } from '../omit';
import { pick } from '../pick';

export const focus = <S extends Record<PropertyKey, any>>(source: S) => {
	return {
		pick: <K extends keyof S>(keys: K[]) => pick<S, K>(source, ...keys),
		omit: <K extends keyof S>(keys: K[]) => omit<S, K>(source, ...keys),
	};
};

export { focus as objectFocus };
