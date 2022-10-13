import { JesterFactoryInstance } from './data/factory-instance';
import { JesterFactoryParseOptions } from './data/parse-options';
import { Fakeable, IJesterFactoryOptions, IJesterFactoryInstance } from './domain';

const optionsParser = new JesterFactoryParseOptions();

export const factoryFn = <Raw extends Fakeable, Product extends Fakeable = Raw>(
	fallback: () => Raw,
	options?: IJesterFactoryOptions.Input<Raw, Product>
): IJesterFactoryInstance<Raw, Product> => {
	const dataOptions = optionsParser.parse(fallback, options || {});
	return new JesterFactoryInstance(dataOptions);
};
