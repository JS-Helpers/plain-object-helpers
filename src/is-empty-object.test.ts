// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { isEmptyObject } from './is-empty-object';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const testCases: {
	parameters: Parameters<typeof isEmptyObject>;
	result: ReturnType<typeof isEmptyObject>;
}[] = [
	{
		parameters: [{}],
		result: true
	},
	{
		parameters: [{ key: 'value' }],
		result: false
	},
	{
		parameters: [new Date()],
		result: true
	},
	{
		parameters: [new RegExp('x')],
		result: true
	}
];

describe('isEmptyObject tool', () => {
	testCases.forEach(({ parameters, result }, i) => {
		test(`test #${i + 1}: ${parameters.join(', ')}`, () => {
			const bool = isEmptyObject(...parameters);
			expect(bool).toStrictEqual(result);
		});
	});
});
