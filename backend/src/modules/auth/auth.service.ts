import {
	Injectable,
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../user';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Role, User } from '../../../prisma/prisma/generated/client';

@Injectable()
export class AuthService {
	private readonly jwtSecret: string;

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.jwtSecret =
			this.configService.getOrThrow<string>('JWT_SECRET_KEY');
	}

	async register(dto: RegisterUserDto): Promise<User> {
		const existingUser = await this.userService
			.findByEmail(dto.email)
			.catch(() => null);

		if (existingUser) {
			throw new BadRequestException(
				'User with this email already exists',
			);
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const userId = uuidv4();

		return await this.userService.createUser({
			id: userId,
			email: dto.email,
			fullName: dto.fullName,
			phoneNumber: dto.phoneNumber,
			shippingAddress: dto.shippingAddress,
			password: hashedPassword,
			description: dto.description,
			role: dto.role,
		});
	}

	async login(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('Invalid credentials');

		const match = await bcrypt.compare(password, user.password);
		if (!match) throw new NotFoundException('Invalid credentials');

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

		return tokens;
	}

	async getTokens(
		userId: string,
		email: string,
		role: Role,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const payload = { sub: userId, email, role };
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_SECRET_KEY'),
				expiresIn: '72h',
			}),
			this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
				expiresIn: '7d',
			}),
		]);

		return { accessToken, refreshToken };
	}

	async updateRefreshTokenHash(
		userId: string,
		refreshToken: string,
	): Promise<void> {
		const hash = await bcrypt.hash(refreshToken, 10);
		await this.userService.updateUser(userId, { hashedRt: hash });
	}

	async refreshTokens(
		userId: string,
		rt: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.userService.findById(userId);
		if (!user || !user.hashedRt) {
			throw new UnauthorizedException('Access Denied');
		}

		const isRtValid = await bcrypt.compare(rt, user.hashedRt);
		if (!isRtValid) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
		return tokens;
	}

	async generateAccessToken(
		userId: string,
		email: string,
		role: Role,
	): Promise<string> {
		const payload = { sub: userId, email, role };
		return await this.jwtService.signAsync(payload, {
			secret: this.jwtSecret,
			expiresIn: '72h',
		});
	}

	async logout(userId: string): Promise<void> {
		await this.userService.updateUser(userId, { hashedRt: null });
	}
}
