export type { Config } from '@jest/types';
import { Test } from '../types';

export class JestPresetBuilder {
	public static scope?: Test.Scope;

	constructor(private readonly config: Test.Builder.Config, private readonly specificScopeConfig: Test.Specifics) {}

	public parse = (initial: Test.Config) => {
		const config = this.makeInitialConfig(initial);
		const scope = JestPresetBuilder.scope;
		if (scope) {
			const configMutator = this.specificScopeConfig[scope];
			if (configMutator) {
				const configMutatorFn = typeof configMutator === 'function' ? configMutator : () => configMutator;
				Object.assign(config, configMutatorFn(config));
			}
		}
		return config;
	};

	private makeInitialConfig = (initial: Test.Config): Test.Config => {
		const getConfig = this.config;
		const config = typeof getConfig === 'function' ? getConfig(initial) : getConfig;
		return Object.assign({}, initial, config);
	};
}
