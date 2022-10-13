export type { Config } from '@jest/types';
import { Test } from '../types';

export const makeJestConfig = (
	config: Test.Config,
	specificsScope: Test.Specifics,
	testScope: Test.Scope,
): Test.Config => {
	if (testScope) {
		const testScopeCapitalized = `${testScope.charAt(0).toUpperCase()}${testScope.slice(1)}`;
		const configMutator = specificsScope?.[testScope];
		if (configMutator) {
			console.log(`Running ${testScopeCapitalized} Tests`);

			const configMutatorFn = typeof configMutator === 'function' ? configMutator : () => configMutator;

			Object.assign(config, configMutatorFn(config));
		}
	}
	return config;
};
