import vscode from './use-cases/vscode';
import node from './use-cases/node';

const presets = {
	vscode,
	node,
};

export type TestPreset = keyof typeof presets;

export default presets;
