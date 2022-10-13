import { Partial } from '../../types';
import { FilledArray } from '../data/entities';
import { IJesterFactoryTransforms as Transforms } from './transformations';
import { Fakeable } from './types';

export interface IJesterFactoryOptions<Raw extends Fakeable, Product extends Fakeable = Raw> {
	readonly name?: string;

	fallback(): Raw;
	build(raw: Raw): Product;

	/**
	 * Functions used to merge the fallback values with the incoming values.
	 *
	 * @param {Product} fallback the fallback values
	 * @param {Partial.Deep<Product>} deepPartial the incoming values
	 *
	 * @returns {Product} the final value
	 */
	readonly mergeFns: IJesterFactoryOptions.MergeFn.Many<Raw>;
	readonly transforms: Transforms.Options<Raw, Product>;
}

export declare namespace IJesterFactoryOptions {
	export type MergeFn<Raw extends Fakeable> = Required<
		IJesterFactoryOptions.Input<Raw>
	>['mergeFn'];
	export namespace MergeFn {
		export type One<Raw extends Fakeable = any> = MergeFn<Raw>;
		export type Many<Raw extends Fakeable = any> = FilledArray<One<Raw>>;
	}
}

export declare namespace IJesterFactoryOptions {
	export interface Input<Raw extends Fakeable, Product extends Fakeable = Raw> {
		readonly name?: string;
		/**
		 * Functions used to merge the fallback values with the incoming values.
		 *
		 * @param {Product} fallback the fallback values
		 * @param {Partial.Deep<Product>} deepPartial the incoming values
		 *
		 * @returns {Product} the final value
		 */
		mergeFn?(fallback: Raw, deepPartial: Partial.Deep<Raw> | undefined): Raw;

		build?(raw: Raw): Product;
	}
}
