import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UseGuards,
	Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../user';
import { LoginUserDto } from './dto/login-user.dto';
import { AtGuard } from './guards/access-token.guard';
import { Public } from './decorators';
import { RtGuard } from './guards/rt-token.guard';
import { GetCurrentUserId } from './decorators';
import { GetUserRefresh } from './decorators/get-user-refresh.decorators';
import { User } from 'prisma/prisma/generated/client';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	register(@Body() dto: RegisterUserDto): Promise<User> {
		return this.authService.register(dto);
	}

	@Public()
	@Post('login')
	@HttpCode(HttpStatus.OK)
	login(
		@Body() dto: LoginUserDto,
	): Promise<{ accessToken: string; refreshToken: string }> {
		return this.authService.login(dto.email, dto.password);
	}

	@UseGuards(AtGuard)
	@Get('profile')
	getProfile(@GetCurrentUserId() userId: string): Promise<string> {
		return this.authService.generateAccessToken(
			userId,
			'user@example.com',
			'CLIENT',
		);
	}

	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	refresh(
		@GetUserRefresh('sub') userId: string,
		@GetUserRefresh('refreshToken') refreshToken: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		return this.authService.refreshTokens(userId, refreshToken);
	}

	@UseGuards(AtGuard)
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUserId() userId: string) {
		return this.authService.logout(userId);
	}
}
