import { Test } from '../types';
import { JestPresetBuilder } from '../jest-config-preset-builder';

import presets, { TestPreset } from '../../presets';
import { makeJestConfig } from './builder-fn';
import { TestScopeReader } from '../scope-reader';

const scopeReader = new TestScopeReader();
JestPresetBuilder.scope = scopeReader.getScope();

const emptyConfigCallback: Test.Builder.ConfigCallback = (config: Test.Config): Test.Config =>
	config;

export class JestConfigBuilder {
	private _config: Test.Builder.ConfigCallback = emptyConfigCallback;
	private _specificScopeConfig: Test.Specifics = {};
	private _preset?: TestPreset;
	public get scope(): Test.Scope {
		return JestPresetBuilder.scope as any;
	}

	config = (next: Test.Builder.Config) => {
		if (typeof next === 'function') {
			this._config = next;
		} else {
			this._config = (prev) => Object.assign({}, prev, next);
		}
		return this;
	};

	preset = (next: TestPreset) => {
		this._preset = next;
		return this;
	};

	onScopes = (next: Test.Specifics) => {
		Object.assign(this._specificScopeConfig, next);
		return this;
	};

	onScope = (scope: Test.Scope, next: Test.SpecificScope.Config) => {
		this._specificScopeConfig[scope] = next;
		return this;
	};

	parse = (): Test.Config => {
		const initialConfig = this.getInitialConfig();
		return makeJestConfig(initialConfig, this._specificScopeConfig, this.scope);
	};

	private getInitialConfig = (): Test.Config => {
		if (this._preset) {
			const preset = presets[this._preset];
			return this._config(preset.parse({}));
		}
		return this._config({});
	};
}

export * from '../types';
