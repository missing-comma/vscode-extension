/**
 * Same behaviour of [Object.entries], but properly typped
 */
export const entries = <T extends object>(source: T): Array<[keyof T, T[keyof T]]> => {
	return Object.entries(source) as any;
};

export { entries as objectEntries };
