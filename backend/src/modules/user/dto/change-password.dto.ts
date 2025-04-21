import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty({ message: 'Password cannot be empty' })
	currentPassword: string;

	@IsString()
	@IsNotEmpty({ message: 'Password cannot be empty' })
	@MinLength(6, {
		message: 'The minimum number of characters in the password is 6',
	})
	newPassword: string;
}
