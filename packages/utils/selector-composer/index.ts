import { pastSelector as past, futureSelector as future } from './use-cases';

export interface ISelectorComposer<Key extends PropertyKey> {
	/**
	 * Composes a selector where the key to be selected must be passed after
	 * the selector-object is created.
	 *
	 * Use this when you want to create a selector after the selector's key is set
	 */
	(accessor: past.KeyAccessor<Key>): past.PastSelectorComposer<Key>;

	/**
	 * Composes a selector where the key to be selected must be passed after
	 * the selector-object is created.
	 *
	 * Use this when you want to create a selector before the selector's key is set
	 */
	(): future.FutureSelectorComposer<Key>;
}

export const composeAnySelector =
	<Key extends PropertyKey>(): ISelectorComposer<Key> =>
	(...args: [] | [accessor: past.KeyAccessor<Key>]) => {
		if (args.length === 0) {
			return future.composeSelector<Key>();
		}
		return past.composeSelector<Key>(args[0]);
	};
