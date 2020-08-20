// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { IPlainObject } from './types';

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

/**
 * @param {IPlainObject} sample
 * @return {boolean}
 */
export function isEmptyObject(sample: IPlainObject) {
	let empty = true;
	for (const key in sample) {
		if (sample.hasOwnProperty(key)) {
			empty = false;
			break;
		}
	}
	return empty;
}
