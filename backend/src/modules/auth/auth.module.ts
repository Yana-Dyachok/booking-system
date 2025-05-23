import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AtStrategy } from './strategies/access-token.strategy';
import { RtStrategy } from './strategies/rt-token.strategy';
import { AtGuard } from './guards/access-token.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET_KEY'),
				signOptions: { expiresIn: '72h' },
			}),
			inject: [ConfigService],
		}),
		ConfigModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		AtStrategy,
		RtStrategy,
		AtGuard,
		RolesGuard,
	],
	exports: [AuthService],
})
export class AuthModule {}
