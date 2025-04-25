import {
	Controller,
	Get,
	Param,
	Put,
	Delete,
	Body,
	NotFoundException,
	Req,
	UseGuards,
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithLoadedEntity } from '@/common/types';
import { User, Role } from '../../../prisma/prisma/generated/client';
import { IBusinessUserPreview } from '@/common/types';
import { AtGuard } from '../auth';
import { QueryDto } from '../appointment/dto/query-appointment';

@UseGuards(AtGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get('business')
	@Roles(Role.CLIENT)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	async getAllBusinessUsers(
		@Query() query: QueryDto,
	): Promise<{ items: IBusinessUserPreview[]; total: number }> {
		return this.userService.findAllBusinessUsers(query);
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<User | null> {
		return this.userService.findById(id);
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
