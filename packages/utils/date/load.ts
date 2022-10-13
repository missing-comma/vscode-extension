import { Datum } from './datum';
import { isWeekday } from './helpers/is-weekday';
import format from 'date-fns/format';

import deltaDays from 'date-fns/differenceInDays';
import deltaMonths from 'date-fns/differenceInMonths';
import deltaWeeks from 'date-fns/differenceInWeeks';
import deltaYears from 'date-fns/differenceInYears';

import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import addYears from 'date-fns/addYears';

import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameWeek from 'date-fns/isSameWeek';
import isSameYear from 'date-fns/isSameYear';

import { DateFormatter } from './helpers/make-formatter';

type DatumLike = Datum | string | number;
export class LoadDateService {
	private readonly dateFormatter: DateFormatter;

	constructor() {
		this.dateFormatter = new DateFormatter(this);
	}

	public now = (): Datum => new Datum(new Date());

	public today = (): Datum => this.now().startOf.day();

	public snapToNextBusinessDate = (date: Datum): Datum => {
		if (!date.weekend) return date;
		if (isWeekday(date, 'sunday')) return date.addDays(1);
		return date.addDays(2);
	};

	public format = {
		date: {
			human: (date: DatumLike): string => {
				return this.dateFormatter.human((datum) => {
					return format(datum, 'dd/MM/yyyy');
				})(date);
			},
			db: (date: DatumLike): string => {
				return this.dateFormatter.db((datum) => {
					return format(datum, 'yyyy-MM-dd');
				})(date);
			},
		},
		month: (date: DatumLike): string => {
			return this.dateFormatter.human((datum) => {
				return format(datum, 'MMMM');
			})(date);
		},
		time: {
			human: (date: DatumLike): string => {
				return this.dateFormatter.human((datum) => {
					return format(datum, 'hh:mm');
				})(date);
			},
			db: (date: DatumLike): string => {
				return this.dateFormatter.db((datum) => {
					return format(datum, 'hh:mm');
				})(date);
			},
		},
		weekday: (date: DatumLike): string => {
			return this.dateFormatter.human((datum) => {
				return format(datum, 'eeee', { weekStartsOn: 0 });
			})(date);
		},
	};

	public parse = (date: string): Datum | null => {
		const parts = date.split(/\/|-/g);
		if (date.match(/\//)) {
			parts.reverse();
		}
		const out = new Datum(parts.join('-'));
		if (!this.isValid(out)) {
			return null;
		}
		if (date.match(/-/)) {
			return out.toUTC();
		}
		return out;
	};

	public isValid = (date: Datum | string): boolean => {
		if (typeof date === 'string') {
			const parsed = this.parse(date);
			if (!parsed) return false;
			date = parsed;
		}
		return date instanceof Datum && !isNaN(date.valueOf());
	};

	public add = {
		days: (datum: Datum, days: number): Datum => new Datum(addDays(datum, days)),
		months: (datum: Datum, months: number): Datum => new Datum(addMonths(datum, months)),
		weeks: (datum: Datum, weeks: number): Datum => new Datum(addWeeks(datum, weeks)),
		years: (datum: Datum, years: number): Datum => new Datum(addYears(datum, years)),
	};

	public diff = {
		days: (datum: Datum, reference?: Datum): number =>
			deltaDays(datum, reference ?? this.today()),
		months: (datum: Datum, reference?: Datum): number =>
			deltaMonths(datum, reference ?? this.today()),
		weeks: (datum: Datum, reference?: Datum): number =>
			deltaWeeks(datum, reference ?? this.today()),
		years: (datum: Datum, reference?: Datum): number =>
			deltaYears(datum, reference ?? this.today()),
	};

	public is = (referenceDate: Datum) => {
		const invoke = <R, A extends any[]>(fn: (d1: Date, d2: Date, ...args: A) => R) => {
			return (date: Datum, ...args: A): R => {
				return fn(referenceDate, date, ...args);
			};
		};
		return {
			after: (dateToCompare: Datum | number) => isAfter(referenceDate, dateToCompare),
			before: (dateToCompare: Datum | number) => isBefore(referenceDate, dateToCompare),
			same: {
				day: invoke(isSameDay),
				month: invoke(isSameMonth),
				week: invoke(isSameWeek),
				year: invoke(isSameYear),
			},
		};
	};
}
