import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export class Datum extends Date {
	private readonly __utc: boolean;

	public static init = (...args: [Datum] | ConstructorParameters<typeof Date>): Datum => {
		if (args.length === 1 && args[0] instanceof Datum) {
			return args[0];
		}
		return new Datum(...(args as ConstructorParameters<typeof Date>));
	};

	constructor(...args: ConstructorParameters<typeof Date>) {
		super(...args);
		this.__utc = false;
	}

	public get year() {
		return this.getUTCFullYear();
	}

	public get month() {
		return this.getUTCMonth() + 1;
	}

	public get day() {
		return this.getUTCDate();
	}

	public get hour() {
		return this.getUTCHours();
	}

	public get minute() {
		return this.getUTCMinutes();
	}

	public get second() {
		return this.getUTCSeconds();
	}

	public get utc(): boolean {
		return this.__utc;
	}

	/**
	 * Current Timezone Offset in seconds
	 */
	public get timezone() {
		return this.getTimezoneOffset() / 60;
	}

	public get weekday(): Weekday {
		return this.getUTCDay() as any;
	}

	public get weekend(): boolean {
		return this.weekday % 6 === 0;
	}

	public setWeekday(weekday: number): Datum {
		if (this.getDay() === weekday) return this;
		const start = this.startOf.week();
		return start.addDays(weekday);
	}

	public startOf = {
		week: (): Datum => this.updateThis(() => new Datum(startOfWeek(this, { weekStartsOn: 0 }))),
		month: (): Datum => this.updateThis(() => new Datum(startOfMonth(this))),
		day: (): Datum => {
			this.setUTCHours(0, 0, 0, 0);
			return this;
		},
	};

	/**
	 * @deprecated use {startOf.day}
	 */
	public startOfDay(): Datum {
		this.setUTCHours(0, 0, 0, 0);
		return this;
	}

	/**
	 * @deprecated use {startOf.month}
	 */
	public startOfMonth(): Datum {
		return this.updateThis(() => new Datum(startOfMonth(this)));
	}

	/**
	 * @deprecated use {DateService.add.days}
	 * @returns
	 */
	public addDays(days: number): Datum {
		return this.updateThis(() => new Datum(addDays(this, days)));
	}

	public copy(): Datum {
		return this.updateThis(() => new Datum(this.getTime()));
	}

	public toDate(): Date {
		return new Date(this.getTime());
	}

	public toUTC(): Datum {
		if (this.utc) {
			return this.copy();
		}
		const asUTC = new Datum(this.getTime() + this.getTimezoneOffset() * 60 * 1000);
		return this.setMetadataUTC(asUTC, true);
	}

	public toNotUTC(): Datum {
		if (!this.utc) {
			return this.copy();
		}
		const asUTC = new Datum(this.getTime() - this.getTimezoneOffset() * 60 * 1000);
		return this.setMetadataUTC(asUTC, false);
	}

	private updateThis = <R extends Datum>(dis: (datum: Datum) => R): R => {
		const next = dis(this);
		if (next) {
			this.setMetadataUTC(next, this.utc);
		}
		return next;
	};

	private setMetadataUTC = (datum: Datum, utc: boolean): Datum => {
		Object.assign(datum, { __utc: utc });
		return datum;
	};
}
