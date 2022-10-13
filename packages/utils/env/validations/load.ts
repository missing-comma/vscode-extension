import { EnvValuesKeys, EnvValidation } from '../types';
import { EnvironmentSchema, EnvironmentInputSchema as InputSchema } from '../schema';
import { LoadEnvValidationCache } from './validation-cache';

export class EnvValidationAdapter implements EnvValidation {
	private readonly cache: LoadEnvValidationCache;

	private readonly validations: EnvValidation.Schema;

	constructor(loadValidations: (cache: LoadEnvValidationCache) => EnvValidation.Schema) {
		this.cache = new LoadEnvValidationCache();
		const unCachedValidations: Record<keyof EnvValidation.Schema, any> = loadValidations(
			this.cache
		);

		this.validations = {} as any;
		Object.keys(unCachedValidations).forEach((keyStr) => {
			const key = keyStr as keyof EnvValidation.Schema;
			this.validations[key] = this.cache.wrapCall(unCachedValidations[key]) as any;
		});
	}

	public validate<P extends EnvValuesKeys>(
		value: EnvironmentSchema[P],
		property: P,
		envs: InputSchema
	): void {
		this.validations[property]?.(value, property, envs);
	}
}
