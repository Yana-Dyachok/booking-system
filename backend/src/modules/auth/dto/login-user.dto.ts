import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ILoginDTO } from '@/common/types';

export class LoginUserDto implements ILoginDTO {
	@IsEmail({}, { message: 'Incorrect email address' })
	@IsNotEmpty({ message: 'Please enter a email address' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Password cannot be empty' })
	@MinLength(6, {
		message: 'The minimum number of characters in the password is 6',
	})
	password: string;
}
