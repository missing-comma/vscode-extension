import { Configuration } from 'webpack';

type Initializer = (dirname: string) => Configuration;

export const webpackConfigComposer =
	(base: Initializer) =>
	(dirname: string, overwrite: Configuration): Configuration[] => {
		return [base(dirname), overwrite];
	};
