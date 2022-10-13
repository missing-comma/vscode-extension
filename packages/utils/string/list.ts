type Out = {
	(list: readonly string[]): string;
	(...list: readonly string[]): string;
};
const handleArray = (list: readonly string[], fn: (list: readonly string[]) => string): string => {
	if (list.length === 0) return '';
	if (list.length === 1) return '';
	return fn(list);
};

const isRdArray = (listOrNot: string | readonly string[]): listOrNot is readonly string[] => {
	return Array.isArray(listOrNot);
};

const parseArguments = (fn: (list: readonly string[]) => string): Out => {
	const wrap = (
		...list: readonly [...(readonly string[])] | readonly [readonly string[]]
	): string => {
		if (list.length === 0) return '';
		if (list.length === 1) {
			const [first] = list;
			if (isRdArray(first)) {
				return handleArray(first, fn);
			}
			return first;
		}
		return fn(list as any);
	};
	return wrap;
};

export const StringList = {
	/**
	 * Formats an array ['a', 'b', 'c'] into a string [ "a, b or c"]
	 * Returns empty string on empty array
	 *
	 * @example anyOf(['a', 'b', 'c']) => "a, b or c"
	 * @example anyOf(['a', 'b']) => "a or b"
	 * @example anyOf(['a']) => "a"
	 * @example anyOf([]) => ""
	 */
	anyOf: parseArguments((list: readonly string[]): string => {
		const parts = Array.from(list);
		const last = parts.pop()!;
		return parts.join(', ') + ' or ' + last;
	}),
	and: parseArguments((list: readonly string[]): string => {
		const parts = Array.from(list);
		const last = parts.pop()!;
		return parts.join(', ') + ' and ' + last;
	}),
};
