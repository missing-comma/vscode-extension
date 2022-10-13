import { Join } from './join';

export type Prepend<S, Key extends string, JoinKey extends string> = {
	[K in keyof S as Join<Key, keyof S, JoinKey>]: S[K];
};
