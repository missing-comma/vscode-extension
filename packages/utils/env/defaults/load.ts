import { mergeDeepLeft } from 'ramda';
import { EnvironmentInputSchema as InputSchema } from '../schema';
import { EnvDefaults } from '../types';

export abstract class LoadEnvDefaultsHelper implements EnvDefaults {
	constructor(private readonly defaults: InputSchema) {}

	apply = (input: InputSchema): InputSchema => {
		return mergeDeepLeft(input, this.defaults);
	};
}
