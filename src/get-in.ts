// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { toPath } from './to-path';
import { isPlainObject } from './is-plain-object';

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

/**
 * Convert string sample in to the path (array)
 * Inspired by final-form's `getIn` helper
 * {@link https://github.com/final-form/final-form/blob/master/src/structure/getIn.js}
 * @param {*} sample
 * @param {string} keyPath
 * @param {*} fallback
 */
export function getIn<GReturnValue = any>(
	sample: any | any[],
	keyPath: string,
	fallback?: GReturnValue
): GReturnValue {
	const path = toPath(keyPath);
	const pathLength = path.length;

	let current: any = sample;
	for (let i = 0; i < pathLength; i++) {
		const key: string = path[i];
		const index = parseInt(key, 10);
		if (isPlainObject(current) && current.hasOwnProperty(key)) {
			current = current[key];
		} else if (Array.isArray(current) && !Number.isNaN(index) && index > -1) {
			current = current[index];
		} else {
			current = undefined;
			break;
		}
	}
	return current === undefined ? fallback : current;
}
