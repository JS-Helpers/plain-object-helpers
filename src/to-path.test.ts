import toPath from './to-path';

const testCases: {
	parameters: Parameters<typeof toPath>;
	result: ReturnType<typeof toPath>;
}[] = [
	{
		parameters: [null],
		result: []
	},
	{
		parameters: [],
		result: []
	},
	{
		parameters: [undefined],
		result: []
	},
	{
		parameters: ['plain.object.helpers'],
		result: ['plain', 'object', 'helpers']
	},
	{
		parameters: ['plain[object][helpers]'],
		result: ['plain[object][helpers]']
	},
	{
		parameters: ['plain[1][2][0]object[10][helpers]'],
		result: ['plain', '1', '2', '0', 'object', '10', '[helpers]']
	},
	{
		parameters: ['plain10]object10]helpers'],
		result: ['plain10]object10]helpers']
	},
	{
		parameters: ['plain[0]object][helpers]'],
		result: ['plain', '0', 'object][helpers]']
	},
	{
		parameters: ['.plain..object...helpers.]'],
		result: ['plain', 'object', 'helpers']
	},
	{
		parameters: ['plain[0]..object[1].helpers]'],
		result: ['plain', '0', 'object', '1', 'helpers]']
	},
	{
		parameters: ['plain[][][]object[1].helpers'],
		result: ['plain[][][]object', '1', 'helpers']
	},
	{
		parameters: ['hasOwnProperty'],
		result: []
	},
	{
		parameters: ['toString'],
		result: ['toString']
	}
];

describe('toPath tool', () => {
	testCases.forEach(({ parameters, result }, i) => {
		test(`test #${i + 1}: ${parameters.join(', ')}`, () => {
			const path = toPath(...parameters);
			expect(path).toStrictEqual(result);
		});
	});
});
