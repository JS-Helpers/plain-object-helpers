// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const cache: Record<string, string[]> = {};
const regex = /(\[(?=\d+])|(?<=\[\d+)])|\.+/;

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

/**
 * Convert string sample in to the props path
 * Inspired by final-form's `toPath` helper
 * {@link https://github.com/final-form/final-form/blob/master/src/structure/toPath.js}
 * @param {string|null} [sample]
 * @returns {string[]}
 */
export const toPath = (sample?: string | null): string[] => {
	if (typeof sample === 'string' && sample.length > 0 && sample !== 'hasOwnProperty') {
		if (!cache.hasOwnProperty(sample)) {
			cache[sample] = sample
				.split(regex)
				.filter(
					(part: string | undefined) =>
						typeof part === 'string' &&
						part.length > 0 &&
						part !== '[' &&
						part !== ']'
				);
		}
		return cache[sample];
	}
	return [];
};
