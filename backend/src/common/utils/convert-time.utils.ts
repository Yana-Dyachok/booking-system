import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export function convertUtcToKyivTime(utcDate: Date): { date: string } {
	const timeZone = 'Europe/Kyiv';
	const zonedDate = toZonedTime(utcDate, timeZone);

	return {
		date: format(zonedDate, 'yyyy-MM-dd HH:mm:ss'),
	};
}
