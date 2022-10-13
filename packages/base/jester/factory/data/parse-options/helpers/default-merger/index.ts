import { Partial } from '../../../../../types';
import { Fakeable, IJesterFactoryOptions as Options } from '../../../entities';
import { mergeDeepRight } from 'ramda';

const mergeFn = <R extends Fakeable>(fallback: R, partial: Partial.Deep<R> | undefined): R => {
	if (!partial) return fallback;

	/**
	 * TODO Add handler for array merging
	 */
	return mergeDeepRight<R, Partial.Deep<R>>(fallback, partial) as R;
};

export const defaultMergeFn = Object.assign(mergeFn, {
	of: <R extends Fakeable>(): Options.MergeFn.One<R> => mergeFn,
});
