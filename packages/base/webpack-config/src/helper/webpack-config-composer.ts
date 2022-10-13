import { Configuration } from 'webpack';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
//@ts-check
/** @typedef {(dirname: string) => Configuration} Initializer **/

type Initializer = (dirname: string) => Configuration;

export const webpackConfigComposer =
	(base: Initializer) =>
	(dirname: string, overwrite: Configuration): [Configuration] => {
		return [{ ...base(dirname), ...overwrite }];
	};
