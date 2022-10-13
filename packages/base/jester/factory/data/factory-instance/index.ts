import { Partial } from '../../../types';
import {
	ArrayOfSize,
	Fakeable,
	IJesterFactoryInstance,
	IJesterFactoryOptions as Options,
	IJesterFactoryTransforms as Transforms,
} from '../entities';
import { forceSize, parseManyValuesArg, pipeMerges, pipeTransform } from './helpers';

export class JesterFactoryInstance<R extends Fakeable, P extends Fakeable>
	implements IJesterFactoryInstance<R, P>
{
	constructor(public readonly options: Options<R, P>) {}

	public raw = (values?: Partial.Deep<R>): R => {
		const merge = pipeMerges(this.options.mergeFns);
		const fallback = this.options.fallback();
		const data = merge(fallback, values);
		const transformed = pipeTransform(this.options.transforms.before)(data);
		return transformed;
	};

	public one = (values?: Partial.Deep<R>): P => {
		const raw = this.raw(values);
		const product = this.options.build(raw);
		const transformed = pipeTransform(this.options.transforms.after)(product);
		return transformed;
	};

	public many = <N extends number>(
		amount: N,
		...args: IJesterFactoryInstance.ManyValuesArgs<R>
	): ArrayOfSize<P, N> => {
		const manyFactory = parseManyValuesArg(args);

		const data = Array.from({ length: amount }, (_, index) => this.raw(manyFactory(index)));
		const products = data.map(this.options.build);
		return forceSize(amount, products);
	};

	public readonly transform: Transforms<R, P> = {
		before: (callback: Transforms.Before.Callback<R>): JesterFactoryInstance<R, P> => {
			this.options.transforms.before.push(callback);
			return this;
		},
		after: <Next extends Fakeable>(
			callback: Transforms.After.Callback<P, Next>
		): JesterFactoryInstance<R, Next> => {
			this.options.transforms.after.push(callback as any);
			return this as any;
		},
	};
}
