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
		parameters: [{ key: 'value' }, 'ZZZ', 'fallbackValue'],
		result: 'fallbackValue'
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
		parameters: [
			{
				key1: ['value0', 'value1', 'value2']
			},
			'key1[10]',
			'fallbackValue'
		],
		result: 'fallbackValue'
	},
	{
		parameters: [
			{
				key1: [
					{
						x: 777
					},
					{
						x: 888
					},
					{
						x: 999
					}
				]
			},
			'key1[2].x'
		],
		result: 999
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
