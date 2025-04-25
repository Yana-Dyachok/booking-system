import { IsOptional, IsNumber, Min } from 'class-validator';
import { IQuery } from '@/common/types';

export class QueryDto implements IQuery {
	@IsOptional()
	@IsNumber({}, { message: 'page must be a number' })
	@Min(1, { message: 'page must be greater than or equal to 1' })
	page?: number = 1;

	@IsOptional()
	@IsNumber({}, { message: 'limit must be a number' })
	@Min(1, { message: 'limit must be greater than or equal to 1' })
	limit?: number = 10;
}
