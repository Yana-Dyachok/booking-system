import {
	Controller,
	Get,
	Param,
	Put,
	Delete,
	Body,
	NotFoundException,
	Req,
	BadRequestException,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '.prisma/client';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithLoadedEntity } from '@/common/types';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<User | null> {
		return this.userService.findById(id);
	}

	@Get('role/:role')
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard())
	async findByRole(@Param('role') role: string): Promise<User[]> {
		const upperRole = role.trim().toUpperCase() as keyof typeof Role;

		if (!(upperRole in Role)) {
			throw new BadRequestException(`Role '${role}' is invalid`);
		}

		return this.userService.findByRole(Role[upperRole]);
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		try {
			return await this.userService.updateUser(id, updateUserDto);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw error;
		}
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string): Promise<User> {
		try {
			return await this.userService.deleteUser(id);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw error;
		}
	}

	@Put(':id/change-password')
	async changePassword(
		@Param('id') id: string,
		@Body() dto: ChangePasswordDto,
		@Req() req: RequestWithLoadedEntity<User>,
	) {
		const user = req.entity;
		return this.userService.changePassword(id, dto, user);
	}
}
