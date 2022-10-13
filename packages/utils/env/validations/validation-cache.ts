import { EnvValuesKeys, EnvValidation } from '../types';
import { EnvironmentInputSchema as InputSchema } from '../schema';
import * as Yup from 'yup';

export class LoadEnvValidationCache {
	private readonly cache: Set<EnvValuesKeys> = new Set();

	public wrapCall = <P extends EnvValuesKeys>(fn: EnvValidation.Fn<P>): EnvValidation.Fn<P> => {
		return (value: any, property: P, envs: InputSchema) => {
			if (!this.cache.has(property)) {
				this.cache.add(property);
				const schema = fn(value, property, envs);
				const fallback = schema.type === 'string' ? '' : null;
				Yup.object({ [property]: schema }).validateSync({ [property]: value ?? fallback });
			}
			return {} as any;
		};
	};
}
