// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { isPlainObject } from './is-plain-object';

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

/**
 * @param sample
 * @return {boolean}
 */
export function isEmptyObject(sample: any) {
	let empty = true;
	if (isPlainObject(sample)) {
		for (const key in sample) {
			if (sample.hasOwnProperty(key)) {
				empty = false;
				break;
			}
		}
	}
	return empty;
}
