import { EnvValuesKeys, EnvValidation, EnvDefaults } from './types';
import { EnvironmentInputSchema, IEnvironmentService } from './schema';
import { path } from 'ramda';

export class LoadEnvService implements IEnvironmentService {
	private envs: EnvironmentInputSchema = {} as any;

	constructor(private readonly valitate: EnvValidation, private readonly defaults: EnvDefaults) {}
	public setup = (envs: EnvironmentInputSchema) => {
		this.envs = this.defaults.apply(envs);
	};

	get = (key: EnvValuesKeys, defaultValue: any = null) => {
		const value = path(key.split('.'), this.envs) ?? defaultValue;

		this.valitate.validate(value, key, this.envs);

		return value;
	};
}
