export type Fakeable = Record<string, any>;

type SizesInArray = keyof ArraySizes<any>;
type ArraySizes<V> = {
	0: [];
	1: [V];
	2: [V, V];
	3: [V, V, V];
	4: [V, V, V, V];
	5: [V, V, V, V, V];
	6: [V, V, V, V, V, V];
};
export type ArrayOfSize<V, L extends number> = L extends SizesInArray ? ArraySizes<V>[L] : V[];
export type FilledArray<V> = [V, ...V[]];
