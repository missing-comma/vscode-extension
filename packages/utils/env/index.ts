import { LoadEnvService } from './load';
import { EnvValidationInstance } from './validations';
import { LoadEnvDefaults } from './defaults';
import { EnvironmentInputSchema, IEnvironmentService } from './schema';

const Env = new LoadEnvService(EnvValidationInstance, new LoadEnvDefaults());

export const Environment: IEnvironmentService = Env;

export const setupEnv = (envs: EnvironmentInputSchema) => {
	Env.setup(envs);
};
