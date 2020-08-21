// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { toPath } from './to-path';
import { isPlainObject } from './is-plain-object';
import { IPlainObject } from './types';

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

const setInRecursive = (
	current: any | any[],
	value: any,
	path: (string | number)[],
	index: number
) => {
	if (index >= path.length) {
		return;
	}
	const key = path[index];
	const nextIndex = index + 1;
	const numberKey = typeof key === 'number';
	const sampleIsArray = Array.isArray(current);

	if (nextIndex === path.length) {
		if (sampleIsArray) {
			if (numberKey) {
				current[key] = value;
			} else {
				throw new Error(`Key \`${key}\` must be an array index (correct int)`);
			}
		} else if (isPlainObject(current)) {
			current[key] = value;
		} else {
			throw new Error('Last chain must be an object or array');
		}
	} else {
		if (isPlainObject(current)) {
			if (!current.hasOwnProperty(key)) {
				// setting inner prop based on next path index
				current[key] = typeof path[nextIndex] === 'number' ? [] : {};
			}
			setInRecursive(current[key], value, path, nextIndex);
		} else {
			throw new Error('`setIn()` tool ends up with wrong result');
		}
	}
};

/**
 * Setting value in Object by path
 * Inspired by final-form's `setIn` helper
 * {@link https://github.com/final-form/final-form/blob/master/src/structure/setIn.js}
 * @param {IPlainObject} sample
 * @param {string} keyPath
 * @param {*} value
 */
export function setIn(sample: IPlainObject, keyPath: string, value: any) {
	return setInRecursive(
		sample,
		value,
		toPath(keyPath).map((key) => {
			const index = parseInt(key);
			return isNaN(index) ? key : index;
		}),
		0
	);
}
