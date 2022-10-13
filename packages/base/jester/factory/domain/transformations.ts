import { IJesterFactoryInstance } from './factory-instance';
import { Fakeable } from './types';

export interface IJesterFactoryTransforms<Raw extends Fakeable, Product extends Fakeable> {
	readonly before: IJesterFactoryTransforms.Before<Raw, Product>;
	readonly after: IJesterFactoryTransforms.After<Raw, Product>;
}

export declare namespace IJesterFactoryTransforms {
	export interface After<Raw extends Fakeable, Product extends Fakeable> {
		<Next extends Fakeable>(
			callback: IJesterFactoryTransforms.After.Callback<Product, Next>
		): IJesterFactoryInstance<Raw, Next>;
	}

	export namespace After {
		export interface Callback<Product extends Fakeable, Next extends Fakeable = Product> {
			(product: Product): Next;
		}
	}
}

export declare namespace IJesterFactoryTransforms {
	export interface Before<Raw extends Fakeable, Product extends Fakeable> {
		(callback: IJesterFactoryTransforms.Before.Callback<Raw>): IJesterFactoryInstance<
			Raw,
			Product
		>;
	}
	export namespace Before {
		export interface Callback<Raw extends Fakeable> {
			(raw: Raw): Raw;
		}
	}
}

export declare namespace IJesterFactoryTransforms {
	export interface Options<Raw extends Fakeable, Product extends Fakeable> {
		readonly before: IJesterFactoryTransforms.Before.Callback<Raw>[];
		readonly after: IJesterFactoryTransforms.After.Callback<Product, Product>[];
	}
}
