import { registerAs } from '@nestjs/config';
import { IConfig } from '../types/index';

export const envConfig = registerAs(
	'config',
	(): IConfig => ({
		port: parseInt(process.env.PORT as string, 10) ?? 3030,
		secret_key: process.env.SECRET_KEY ?? 'secret-key',
		token_expiration:
			parseInt(process.env.EXPIRATION_AGE as string, 10) ?? 3600,
		nodeEnv: process.env.NODE_ENV ?? 'development',
		frontendUrl: process.env.FRONTEND_URL,
		jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'default-jwt-secret',
		jwtRefreshSecretKey:
			process.env.JWT_REFRESH_SECRET_KEY ?? 'default-jwt-refresh',
	}),
);
