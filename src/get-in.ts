// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { IPlainObject } from './types';
import { toPath } from './to-path';
import { isPlainObject } from './is-plain-object';

/**
 * Convert string sample in to the path (array)
 * Inspired by final-form's `toPath` helper
 * {@link https://github.com/final-form/final-form/blob/master/src/structure/toPath.js}
 * @param {IPlainObject|Array} sample
 * @param {string} keyPath
 */
export function getIn<GValue = any>(
	sample: IPlainObject | GValue[],
	keyPath: string
): GValue | undefined {
	const path = toPath(keyPath);
	const pathLength = path.length;

	let current: any = sample;
	for (let i = 0; i < pathLength; i++) {
		const key: string = path[i];
		if (
			(isPlainObject(current) && current.hasOwnProperty(key)) ||
			(Array.isArray(current) && !isNaN(+key))
		) {
			current = current[key];
		} else {
			current = undefined;
			break;
		}
	}
	return current;
}
