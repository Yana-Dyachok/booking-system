import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma-orm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User, Role } from '../../../prisma/prisma/generated/client';
import { IBusinessUserPreview } from '@/common/types';
import { QueryDto } from '../appointment/dto/query-appointment';

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
	async findAllBusinessUsers(
		query: QueryDto,
	): Promise<{ items: IBusinessUserPreview[]; total: number }> {
		const { page = 1, limit = 10 } = query;
		const skip = (Number(page) - 1) * Number(limit);
		const take = Number(limit);

		try {
			const [items, total] = await this.prisma.$transaction([
				this.prisma.user.findMany({
					where: { role: 'BUSINESS' },
					skip,
					take,
					select: {
						id: true,
						fullName: true,
						description: true,
						email: true,
						phoneNumber: true,
					},
				}),
				this.prisma.user.count({ where: { role: 'BUSINESS' } }),
			]);

			console.log('Items count:', items.length);
			console.log('Total count:', total);

			return { items, total };
		} catch (error) {
			console.error('Error fetching business users:', error);
			throw error;
		}
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
	): Promise<User> {
		const user = await this.findById(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}

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
