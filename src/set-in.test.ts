// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

import { setIn } from './set-in';
import { IPlainObject } from './types';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const testCases: {
	parameters: Parameters<typeof setIn>;
	result: IPlainObject;
}[] = [
	{
		parameters: [{}, 'key', 'value'],
		result: { key: 'value' }
	},
	{
		parameters: [{}, 'key1.key2.key3.key4', 'value'],
		result: {
			key1: {
				key2: {
					key3: {
						key4: 'value'
					}
				}
			}
		}
	},
	{
		parameters: [
			{
				key1: {
					key2: {
						xxx: true,
						zzz: false
					}
				}
			},
			'key1.key2.key3.key4',
			'value'
		],
		result: {
			key1: {
				key2: {
					xxx: true,
					zzz: false,
					key3: {
						key4: 'value'
					}
				}
			}
		}
	},
	{
		parameters: [{ list: [] }, 'list[2]', 'value'],
		result: {
			list: [undefined, undefined, 'value']
		}
	},
	{
		parameters: [{}, 'list[2]', 'value'],
		result: {
			list: [undefined, undefined, 'value']
		}
	},
	{
		parameters: [{}, 'key1[0].key3', 'value'],
		result: {
			key1: [
				{
					key3: 'value'
				}
			]
		}
	},
	{
		parameters: [
			{
				key1: [
					{
						key3: 'prev value'
					}
				]
			},
			'key1[0].key3',
			'new value'
		],
		result: {
			key1: [
				{
					key3: 'new value'
				}
			]
		}
	},
	{
		parameters: [
			{
				key1: [null]
			},
			'key1[0].key3',
			'new value'
		],
		result: {
			key1: [
				{
					key3: 'new value'
				}
			]
		}
	}
];

describe('setIn tool', () => {
	testCases.forEach(({ parameters, result }, i) => {
		test(`test #${i + 1}: ${parameters.join(', ')}`, () => {
			if (typeof result === 'string') {
			} else {
				setIn(...parameters);
				const _expect = JSON.stringify(parameters[0], undefined, '\t');
				const _result = JSON.stringify(result, undefined, '\t');
				expect(_expect).toStrictEqual(_result);
			}
		});
	});
});

// -----------------------------------------------------------------------------
// Error handling
// -----------------------------------------------------------------------------

const errorCases: {
	parameters: Parameters<typeof setIn>;
	error: string | RegExp;
}[] = [
	{
		parameters: [{ list: [] }, 'list.item', 'value'],
		error: /must be an array index \(correct int\)/
	}
];

describe('setIn tool: error handling', () => {
	errorCases.forEach(({ parameters, error }, i) => {
		test(`error #${i + 1}: ${error}`, () => {
			expect(() => setIn(...parameters)).toThrow(error);
		});
	});
});
