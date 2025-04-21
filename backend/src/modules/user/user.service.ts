import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma-orm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User, Role } from '.prisma/client';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(data: {
		id: string;
		email: string;
		fullName: string;
		phoneNumber: string;
		shippingAddress: string;
		password: string;
		description?: string;
		role: Role;
	}): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async findById(id: string): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async findByRole(role: Role): Promise<User[]> {
		return this.prisma.user.findMany({ where: { role } });
	}

	async updateUser(id: string, data: UpdateUserDto): Promise<User> {
		const updateData: Partial<User> = { ...data };
		if (data.password) {
			try {
				updateData.password = await bcrypt.hash(data.password, 10);
			} catch (error) {
				console.error('Error hashing password:', error);
				throw new BadRequestException('Failed to update password');
			}
		}

		return this.prisma.user.update({
			where: { id },
			data: updateData,
		});
	}

	async deleteUser(id: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new NotFoundException(`User with email '${email}' not found`);
		}
		return user;
	}

	async changePassword(
		userId: string,
		dto: ChangePasswordDto,
		user: User,
	): Promise<User> {
		let isPasswordValid = false;
		try {
			isPasswordValid = await bcrypt.compare(
				dto.currentPassword,
				user.password,
			);
		} catch (error) {
			console.error('Error comparing passwords:', error);
			throw new BadRequestException('Failed to verify current password');
		}

		if (!isPasswordValid) {
			throw new BadRequestException('Current password is incorrect');
		}

		let hashedPassword = '';
		try {
			hashedPassword = await bcrypt.hash(dto.newPassword, 10);
		} catch (error) {
			console.error('Error hashing new password:', error);
			throw new BadRequestException('Failed to change password');
		}

		return this.prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});
	}
}
