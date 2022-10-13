import { EnvironmentSchema, EnvironmentInputSchema as InputSchema } from './schema';
import { StringSchema, BooleanSchema, NumberSchema } from 'yup';

export type EnvValuesKeys = keyof EnvironmentSchema;

export declare namespace EnvValidation {
	export type Fn<P extends keyof EnvironmentSchema> = (
		value: EnvironmentSchema[P],
		property: P,
		envs: InputSchema
	) => StringSchema | BooleanSchema | NumberSchema;
	export type Schema = { [P in keyof EnvironmentSchema]: Fn<P> };
}

export type EnvValidation = {
	validate<P extends keyof EnvironmentSchema>(
		value: EnvironmentSchema[P],
		property: P,
		envs: InputSchema
	): void;
};

export type EnvDefaults = {
	apply(input: InputSchema): InputSchema;
};
