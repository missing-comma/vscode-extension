import { Datum } from '../datum';

type Formatter = (datum: Datum) => string;

export class DateFormatter {
	constructor(
		private readonly ctx: { parse(date: string): Datum | null; isValid(date: Datum): boolean }
	) {}

	public human = (format: Formatter) => {
		return (date: Datum | string | number): string => {
			const parsed = this.initDate(date);
			if (!parsed) return '';
			return format(parsed);
		};
	};

	public db = (format: Formatter) => {
		return (date: Datum | string | number): string => {
			const parsed = this.initDate(date);
			if (!parsed) return '';
			return format(parsed.toUTC());
		};
	};

	private initDate = (date: Datum | string | number): Datum | null => {
		if (typeof date === 'string') {
			return this.ctx.parse(date);
		}
		if (typeof date === 'number') {
			return new Datum(date);
		}
		return date;
	};
}
