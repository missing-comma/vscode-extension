export type Str<S> = Extract<S, string>;

export type Join<A1 = never, A2 = never, JoinKey extends Readonly<string> = '.'> = [A1] extends [never]
	? Str<A2>
	: `${Str<A1>}${JoinKey}${Str<A2>}`;
