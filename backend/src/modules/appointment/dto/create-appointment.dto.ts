import {
	IsUUID,
	IsDateString,
	IsInt,
	Min,
	IsString,
	Matches,
} from 'class-validator';

export class CreateAppointmentDto {
	@IsUUID()
	businessId: string;

	@IsDateString()
	date: string;

	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
		message: 'time must be in HH:mm format',
	})
	time: string;

	@IsInt()
	@Min(1)
	durationMin: number;
}
