/**
 * Capitalizes a string
 *
 * @param {string|null|undefined} str
 * @returns {string} the capitalized string, or an empty string if the input is null or undefined
 */
export const capitalize = (str: string | null | undefined): string =>
	str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
