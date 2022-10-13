import { Datum } from '../datum';

const ALL_WEEKDAYS = [
	'sunday',
	'monday',
	'thursday',
	'wednesday',
	'tuesday',
	'friday',
	'saturday',
] as const;
type Weekdays = typeof ALL_WEEKDAYS[number];

export const isWeekday = (datum: Datum, weekday: Weekdays): boolean => {
	return datum.weekday === ALL_WEEKDAYS.indexOf(weekday);
};
