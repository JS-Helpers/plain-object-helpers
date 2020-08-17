// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { IPlainObject } from './types';

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

/**
 * @param sample
 * @return {boolean}
 */
export function isPlainObject<GValue = any>(sample: any): sample is IPlainObject<GValue> {
	return sample instanceof Object && !Array.isArray(sample);
}
