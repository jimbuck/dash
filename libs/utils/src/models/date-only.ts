/**
 * A subclass of the Date class to simplify working with Date only values. Overrides the constructor and toJSON methods.
 *
 * @export
 * @class DateOnly
 * @extends {Date}
 */
export class DateOnly extends Date {

	constructor(value: string | number | Date | null | undefined) {
		if (value === null || typeof value === 'undefined') super(value ?? 0);
		else {
			const d = new Date(value);
			super(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
		}
	}

	public toJSON(): string {
		const year = this.getFullYear();

		const month = (this.getMonth() + 1).toString().padStart(2, '0');
		const day = this.getDate().toString().padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	public static from(value: string | number | Date | null | undefined): DateOnly | null | undefined {
		if (value === null) return null;
		if (typeof value === 'undefined') return undefined;
		return new DateOnly(value);
	}
}
