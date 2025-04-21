import {
	IsNotEmpty,
	IsString,
	IsEmail,
	MinLength,
	IsOptional,
} from 'class-validator';
import { IUserDTO } from 'src/common/types';
import { Role } from '.prisma/client';

export class RegisterUserDto implements IUserDTO {
	@IsEmail({}, { message: 'Please enter a valid email address' })
	@IsNotEmpty({ message: 'Email cannot be empty' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Password cannot be empty' })
	@MinLength(6, {
		message: 'The minimum number of characters in the password is 6',
	})
	password: string;

	@IsString()
	@IsNotEmpty({ message: 'Full name cannot be empty' })
	fullName: string;

	@IsString()
	@IsNotEmpty({ message: 'Address cannot be empty' })
	shippingAddress: string;

	@IsString()
	@IsNotEmpty({ message: 'Phone number cannot be empty' })
	phoneNumber: string;

	@IsNotEmpty({ message: 'Role cannot be empty' })
	role: Role;

	@IsString()
	@IsOptional()
	description?: string;
}
