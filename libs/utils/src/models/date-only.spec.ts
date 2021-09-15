import { DateOnly } from './date-only';

describe('DateOnly', () => {

	it.each([
		['1970-01-01'],
		['1960-03-22'],
		['2021-10-04'],
		['2050-10-11'],
	])('should parse %s', dateStr => {
		const d = new DateOnly(dateStr);
		expect(d).toBeInstanceOf(DateOnly);
		expect(d).toBeInstanceOf(Date);
		expect(Date.prototype.valueOf.call(d)).not.toBeNaN();
	});

	it.each([
		['1970-01-01', '1970-01-01'],
		['01/01/1970', '1970-01-01'],
		['1960-03-22', '1960-03-22'],
		['03/22/1960', '1960-03-22'],
		['2021-10-04', '2021-10-04'],
		['10/04/2021', '2021-10-04'],
		['2050-10-11', '2050-10-11'],
		['10/11/2050', '2050-10-11'],
	])('should return an ISO date-only string from toJSON (%s)', (dateOnly, expected) => {
		expect(new DateOnly(dateOnly).toJSON()).toBe(expected);
	});
});
