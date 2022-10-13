type Result<K1, K2 extends K1> = [Exclude<K1, K2>] extends [never]
	? readonly K2[]
	: `[ ${Extract<Exclude<K1, K2>, string>} ] is missing in array`;

interface IGetArrayOfKeys {
	<K1 extends string>(): {
		<K2 extends K1>(...keys: K2[]): Result<K1, K2>;
	};
}

/**
 * Returns a string-array built where if a key is missing in the array, a type error will be shown
 */
export const makeEnum: IGetArrayOfKeys = <K1 extends string>() => {
	return <K2 extends K1>(...keys: K2[]): Result<K1, K2> => {
		return keys as any;
	};
};
