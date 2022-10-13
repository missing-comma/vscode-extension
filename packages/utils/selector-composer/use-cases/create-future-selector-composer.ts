export interface FutureSelectorFn<Key extends PropertyKey, T> {
	/**
	 * Selects a value from the given object
	 */
	(key: Key): T;
}

export interface FutureSelectorComposer<Key extends PropertyKey> {
	/**
	 * Creates a selector that selects a value from the given object
	 *
	 * Not every key is needed to be defined for a valid value to be returned
	 * In case the selected-key is not found, returns the value defined at [default] in selector-object
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape a partial selector,
	 * but with the default key set
	 *
	 * @returns {FutureSelectorFn<Key,T>} a selector that selects a value from the given object
	 **/
	<T>(shape: Partial<Record<Key, T>> & { default: T }): FutureSelectorFn<Key, T>;

	/**
	 * Creates a selector that selects a value from the given object
	 *
	 * Every possible key is needed to be defined for a valid value to be returned
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape the selector-object with every possible
	 * key set
	 *
	 * @returns {FutureSelectorFn<Key,T>} a selector that selects a value from the given object
	 **/
	<T>(shape: Record<Key, T>): FutureSelectorFn<Key, T>;

	/**
	 * Creates a selector that selects a value from the given object
	 *
	 * In case the selected-key is not found, returns null
	 *
	 * @param {Partial<Record<Key, T>> & { default: T }} shape a partial selector
	 *
	 * @returns {FutureSelectorFn<Key,T>} a selector that selects a value from the given object
	 **/
	<T>(shape: Partial<Record<Key, T | null>>): {
		/**
		 * Selects a value from the given object, or null if the key is not found in the selector-object
		 */
		(key: Key): T | null;
	};
}

export const composeSelector = <Key extends PropertyKey>(): FutureSelectorComposer<Key> => {
	return (shape: Partial<Record<Key, any>> & { default?: any }): any => {
		return (key: Key) => {
			if (key in shape) {
				return shape[key];
			}
			if ('default' in shape) {
				return shape.default;
			}
			return null;
		};
	};
};
