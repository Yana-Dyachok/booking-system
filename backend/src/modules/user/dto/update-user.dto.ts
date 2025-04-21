import {
	IsOptional,
	IsString,
	IsEmail,
	IsPhoneNumber,
	MinLength,
} from 'class-validator';
import { IUserDTO } from 'src/common/types';

export class UpdateUserDto implements Partial<IUserDTO> {
	@IsOptional()
	@IsString()
	fullName?: string;

	@IsOptional()
	@IsEmail({}, { message: 'Please enter a valid email address' })
	email?: string;

	@IsOptional()
	@IsPhoneNumber()
	phoneNumber?: string;

	@IsOptional()
	@IsString()
	shippingAddress?: string;

	@IsOptional()
	@IsString()
	@MinLength(6, {
		message: 'The minimum number of characters in the password is 6',
	})
	password?: string;

	@IsOptional()
	hashedRt?: string | null;

	@IsString()
	@IsOptional()
	description?: string;
}
