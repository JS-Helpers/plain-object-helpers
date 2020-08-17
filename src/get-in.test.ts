// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { getIn } from './get-in';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const testCases: {
	parameters: Parameters<typeof getIn>;
	result: ReturnType<typeof getIn>;
}[] = [
	{
		parameters: [{ key: 'value' }, 'key'],
		result: 'value'
	},
	{
		parameters: [{ key: 'value' }, 'ZZZ'],
		result: undefined
	},
	{
		parameters: [
			{
				key1: {
					key2: {
						key3: 'value'
					}
				}
			},
			'key1.key2.key3'
		],
		result: 'value'
	},
	{
		parameters: [
			{
				key1: ['value0', 'value1', 'value2']
			},
			'key1[1]'
		],
		result: 'value1'
	},
	{
		parameters: [['value0', 'value1', 'value2'], '[1]'],
		result: 'value1'
	}
];

describe('getIn tool', () => {
	testCases.forEach(({ parameters, result }, i) => {
		test(`test #${i + 1}: ${parameters.join(', ')}`, () => {
			const value = getIn(...parameters);
			expect(value).toStrictEqual(result);
		});
	});
});
