/**
 * Same behaviour of [Object.keys], but properly typped
 */
export const keys = <T extends object>(source: T): Array<keyof T> => {
	return Object.keys(source) as any;
};

export { keys as objectKeys };
