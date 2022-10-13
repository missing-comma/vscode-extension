import * as Yup from 'yup';
import { EnvValidationAdapter } from './load';

export const EnvValidationInstance = new EnvValidationAdapter(() => {
	return {
		env: () => Yup.string().is(['dev', 'staging', 'prod', 'test']).required(),
		'notification.alexa.notifyMeAccessCode': () => Yup.string().required(),
		'notification.email.password': () => Yup.string().required(),
		'notification.email.service': () => Yup.string().required(),
		'notification.email.user': () => Yup.string().required(),
	};
});
