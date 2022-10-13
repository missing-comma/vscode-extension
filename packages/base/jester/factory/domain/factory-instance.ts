import { Fakeable } from '.';
import { Partial } from '../../types';
import { IJesterFactoryOptions } from './options';
import { IJesterFactoryTransforms } from './transformations';
import { ArrayOfSize } from './types';

export interface IJesterFactoryInstance<Raw extends Fakeable = {}, Product extends Fakeable = Raw> {
	readonly options: IJesterFactoryOptions<Raw, Product>;

	raw(values?: Partial.Deep<Raw>): Raw;
	one(values?: Partial.Deep<Raw>): Product;
	many<N extends number>(
		amount: N,
		...args: IJesterFactoryInstance.ManyValuesArgs<Raw>
	): ArrayOfSize<Product, N>;

	readonly transform: IJesterFactoryTransforms<Raw, Product>;
}

export declare namespace IJesterFactoryInstance {
	export type ManyValuesArgs<Raw extends Fakeable = {}> =
		| [values?: Partial.Deep<Raw>[]]
		| [factory: (index: number) => Partial.Deep<Raw>];
}
