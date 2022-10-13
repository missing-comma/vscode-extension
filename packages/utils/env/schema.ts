export interface EnvironmentSchema {
	env: 'dev' | 'staging' | 'prod' | 'test';
	'notification.alexa.notifyMeAccessCode': string;
	'notification.email.user': string;
	'notification.email.password': string;
	'notification.email.service': string;
}

export type EnvironmentInputSchema = {
	env: 'dev' | 'staging' | 'prod' | 'test';
	notification?: {
		alexa?: {
			notifyMeAccessCode?: string;
		};
		email?: {
			user?: string;
			password?: string;
			service?: string;
		};
	};
};

export interface IEnvironmentService {
	get<K extends keyof EnvironmentSchema>(key: K): EnvironmentSchema[K];
	get<K extends OptionalKeys>(
		key: K,
		defaultValue: Required<EnvironmentSchema>[K]
	): Required<EnvironmentSchema>[K];
}

export type OptionalKeys = {
	[K in keyof EnvironmentSchema]: undefined extends EnvironmentSchema[K] ? K : never;
}[keyof EnvironmentSchema];
