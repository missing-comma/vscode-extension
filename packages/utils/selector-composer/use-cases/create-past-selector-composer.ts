import { always } from 'ramda';

export interface PastSelectorComposer<Key extends PropertyKey> {
	/**
	 * Returns the value associated with the key received as argument.
	 * In case the selected-key is not found, returns the value defined at [default] in selector-object
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape a partial selector,
	 * but with the default key set
	 *
	 * @returns {T} the value at the selected key, or the default value if the key is not found
	 **/
	<T>(shape: Partial<Record<Key, T>> & { default: T }): T;

	/**
	 * Returns the value associated with the key received as argument.
	 *
	 * Every possible key is needed to be defined for a valid value to be returned
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape the selector-object with every possible
	 * key set
	 *
	 * @returns {T} the value at the selected key
	 **/
	<T>(shape: Record<Key, T>): T;

	/**
	 * Returns the value associated with the key received as argument.
	 * if the key is not found, returns null
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape a partial selector
	 *
	 * @returns {T|null} the value at the selected key,
	 * or null if the key is not found
	 **/
	<T>(shape: Partial<Record<Key, T>>): T | null;
}

export type KeyAccessor<Key extends PropertyKey> = Key | (() => Key);

export const composeSelector = <Key extends PropertyKey>(
	accessor: KeyAccessor<Key>
): PastSelectorComposer<Key> => {
	const parsedAccessor = typeof accessor === 'function' ? accessor : always(accessor);
	return (shape: Partial<Record<Key, any>> & { default?: any }): any => {
		const key = parsedAccessor();
		if (key in shape) return shape[key];
		if ('default' in shape) return shape.default;
		return null;
	};
};
