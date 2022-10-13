type Str<X> = Extract<X, string>;
type Join<A, B, JoinKey extends string> = `${Str<A>}${JoinKey}${Str<B>}`;

type Flatable = Record<string, Record<string, any>>;

export type ShallowFlat<S extends Flatable, JoinKey extends string> = {
	[K in keyof S]: {
		[SK in keyof S[K] as Join<K, SK, JoinKey>]: S[K][SK];
	};
}[keyof S];

type ShallowFlatFn<JoinKey extends string> = {
	<S extends Flatable>(src: S): ShallowFlat<S, JoinKey>;
};

const makeShallowFlat = <JK extends string>(joinKey: JK): ShallowFlatFn<JK> => {
	const join = (a: string, b: string) => `${a}${joinKey}${b}`;

	const shallowFlatFn: ShallowFlatFn<JK> = <S extends Flatable>(src: S): ShallowFlat<S, JK> => {
		const shallow = {} as any;
		Object.entries(src).forEach(([key, value]) => {
			Object.entries(value).forEach(([subKey, subValue]) => {
				const flatKey = join(key, subKey);
				shallow[flatKey] = subValue;
			});
		});
		return shallow;
	};
	return shallowFlatFn;
};

export const shallowFlat = Object.assign(makeShallowFlat('.'), {
	with: makeShallowFlat,
});

export { shallowFlat as objectShallowFlat };
