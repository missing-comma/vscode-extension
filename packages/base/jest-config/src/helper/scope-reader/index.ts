import { Test } from '../types';

export class TestScopeReader {
	public getScope = (): Test.Scope => {
		const methods: Array<() => Test.Scope | undefined> = [this.fromEnv, this.fromArgv];
		const possibleScope = methods.reduce((scope: Test.Scope | undefined, method) => {
			return scope || method();
		}, undefined);

		return possibleScope || ('' as any);
	};

	private fromEnv = (): Test.Scope | undefined => {
		const scope = process.env.TEST_SCOPE;
		if (scope && this.isScope(scope)) {
			return scope;
		}
		return undefined;
	};

	private fromArgv = (): Test.Scope | undefined => {
		const argv = process.argv.slice(2);

		let scope: Test.Scope | undefined;
		let prevWasPartial: boolean = false;
		argv.some((arg) => {
			if (this.isScope(arg)) {
				scope = arg;
			} else if (arg === '--scope') {
				if (arg.length === '--scope'.length) {
					prevWasPartial = true;
				} else {
					const [, scopeArg] = arg.split(/=|\s/, 1);
					if (this.isScope(scopeArg)) {
						scope = scopeArg;
					}
				}
			}
			return scope !== undefined;
		});

		return scope;
	};

	private isScope = (value: string): value is Test.Scope => {
		return ['unit', 'integration', 'staged', 'ci'].some((pattern) => value === pattern);
	};
}
