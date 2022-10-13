import { prepend as sut } from './index';

describe('Functional.Object.prepend', () => {
	test('Mapped keys are correctly set', () => {
		const src = { a: 1 };

		expect(sut('x', src)).toStrictEqual({ 'x.a': 1 });
		expect(sut('x', src, '_')).toStrictEqual({ x_a: 1 });
	});

	test('Does nothing on empty object', () => {
		const src = {};
		expect(sut('x', src)).toStrictEqual({});
	});
});
