// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { isPlainObject } from './is-plain-object';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const testCases: {
	parameters: Parameters<typeof isPlainObject>;
	result: ReturnType<typeof isPlainObject>;
}[] = [
	{
		parameters: [null],
		result: false
	},
	{
		parameters: [undefined],
		result: false
	},
	{
		parameters: ['string'],
		result: false
	},
	{
		parameters: [new String()],
		result: true
	},
	{
		parameters: [new Number()],
		result: true
	},
	{
		parameters: [new Boolean()],
		result: true
	},
	{
		parameters: [new Function()],
		result: true
	},
	{
		parameters: [789],
		result: false
	},
	{
		parameters: [['array']],
		result: false
	},
	{
		parameters: [new Array(2)],
		result: false
	},
	{
		parameters: [{}],
		result: true
	},
	{
		parameters: [
			{
				key: 'value'
			}
		],
		result: true
	},
	{
		parameters: [new Object(null)],
		result: true
	},
	{
		parameters: [new Date()],
		result: true
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

describe('isPlainObject tool', () => {
	testCases.forEach(({ parameters, result }, i) => {
		test(`test #${i + 1}: ${parameters.join(', ')}`, () => {
			const bool = isPlainObject(...parameters);
			expect(bool).toStrictEqual(result);
		});
	});
});
