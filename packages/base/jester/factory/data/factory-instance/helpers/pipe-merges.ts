import { Partial } from '../../../../types';
import { Fakeable, IJesterFactoryOptions as Options } from '../../entities';

export const pipeMerges = <R extends Fakeable>(
	options: Options.MergeFn.Many<R>
): Options.MergeFn.One<R> => {
	return (fallback: R, deepPartial: Partial.Deep<R> | undefined) => {
		if (!deepPartial) return fallback;
		return options.reduce((acc, fn) => fn(acc, deepPartial), fallback);
	};
};
