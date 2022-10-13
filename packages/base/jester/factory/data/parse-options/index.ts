import { Fakeable, IJesterFactoryOptions as Options, IJesterFactoryOptions } from '../entities';
import { forceSize, defaultMergeFn } from './helpers';

export class JesterFactoryParseOptions {
	public parse = <R extends Fakeable, P extends Fakeable>(
		fallback: () => R,
		options: IJesterFactoryOptions.Input<R, P>
	): Options<R, P> => {
		const mergeFns = forceSize(1, [defaultMergeFn.of<R>()]);
		if (options.mergeFn) mergeFns.push(options.mergeFn);

		return {
			name: options.name ?? 'n/a',
			build: options.build ?? ((value) => value as any),
			fallback,
			mergeFns,
			transforms: {
				before: [],
				after: [],
			},
		};
	};
}
