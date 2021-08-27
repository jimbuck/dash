
/**
 * Zero in milliseconds.
 */
export const ZERO = 0;

/**
 * One millisecond.
 */
export const MILLISECONDS = 1;

/**
 * 1000 milliseconds.
 */
export const SECONDS = MILLISECONDS * 1000;

/**
 * 60 seconds in milliseconds.
 */
export const MINUTES = SECONDS * 60;

/**
 * 60 minutes in milliseconds.
 */
export const HOURS = MINUTES * 60;

/**
 * 24 hours in milliseconds.
 */
export const DAYS = HOURS * 24;

/**
 * 7 days in milliseconds.
 */
export const WEEKS = DAYS * 7;


/**
 * Converts a `process.hrtime(startTime)` result to milliseconds.
 *
 * @param {[number, number]} [a,b] The result from `process.hrtime(startTime)`.
 * @returns The duration in milliseconds.
 */
export function toMilliseconds([a,b]: [number, number]) {
	return (a * 1000) + (b / 1000000);
}
