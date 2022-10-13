import { JestPresetBuilder } from '../../helper/jest-config-preset-builder';
import { Test } from '../../helper/types';

const specifics: Test.Specifics = {
	unit: {
		testMatch: ['**/*.spec.ts'],
	},
	integration: {
		testMatch: ['**/*.test.ts'],
	},
	staged: {
		findRelatedTests: true,
	},
};

export default new JestPresetBuilder(
	{
		cacheDirectory: '.jest-cache',
		coverageDirectory: '.jest-coverage',
		coveragePathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/dist/'],
		coverageReporters: ['html', 'text'],
		coverageThreshold: {
			global: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
		transform: {
			'^.+\\.(js|jsx|ts|tsx)$': [
				`next/dist/build/swc/jest-transformer.js`,
				{
					isEsmProject: false,
				},
			],
			'.+\\.(css|svg|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		},
		transformIgnorePatterns: [],
		modulePathIgnorePatterns: ['(?:.+?)/dist/'],
	},
	specifics
);
