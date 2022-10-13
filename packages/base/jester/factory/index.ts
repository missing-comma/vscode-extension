import {
	IJesterFactoryInstance,
	IJesterFactoryOptions,
	Fakeable as DomainFakeable,
	IJesterFactoryTransforms,
} from './domain';

import { factoryFn } from './load';

export const factory = factoryFn;

export declare namespace factory {
	export type Fakeable = DomainFakeable;
	export type Instance<
		Raw extends Fakeable,
		Product extends Fakeable = Raw
	> = IJesterFactoryInstance<Raw, Product>;
	export type Options<
		Raw extends Fakeable,
		Product extends Fakeable = Raw
	> = IJesterFactoryOptions<Raw, Product>;
	export type Transforms<
		Raw extends Fakeable,
		Product extends Fakeable = Raw
	> = IJesterFactoryTransforms<Raw, Product>;
}
