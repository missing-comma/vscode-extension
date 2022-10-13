import { Fakeable, IJesterFactoryInstance } from '../../entities';

export const parseManyValuesArg = <R extends Fakeable>(
	args: IJesterFactoryInstance.ManyValuesArgs<R>
) => {
	const [valuesOrFactory] = args;
	if (!valuesOrFactory) return () => undefined;
	if (Array.isArray(valuesOrFactory)) {
		return (index: number) => valuesOrFactory[index] ?? {};
	}
	return valuesOrFactory;
};
