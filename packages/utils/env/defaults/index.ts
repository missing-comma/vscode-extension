import { EnvDefaults } from '../types';
import { LoadEnvDefaultsHelper } from './load';

export class LoadEnvDefaults extends LoadEnvDefaultsHelper implements EnvDefaults {
	constructor() {
		super({
			env: 'test',
			notification: {},
		});
	}
}
