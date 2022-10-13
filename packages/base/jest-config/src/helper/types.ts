import { Config } from '@jest/types';

export declare namespace Test {
	export type Config = Omit<Config.InitialOptions, 'globals'> & { globals?: Config.ConfigGlobals };

	export type Scope = 'unit' | 'integration' | 'staged' | 'ci';

	export type Specifics = Partial<Record<Scope, Test.SpecificScope.Config>>;
}

export declare namespace Test.SpecificScope {
	export type ConfigFn = (conf: Test.Config) => Partial<Test.Config>;

	export type Config = ConfigFn | Partial<Test.Config>;
}

export declare namespace Test.Builder {
	export type ConfigCallback = (config: Test.Config) => Test.Config;
	export type Config = Test.Config | ConfigCallback;
}
