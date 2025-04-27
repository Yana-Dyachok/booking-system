import { Role } from '../../../prisma/prisma/generated/client';

export interface IUserDTO {
	email: string;
	password: string;
	fullName: string;
	shippingAddress: string;
	phoneNumber: string;
	description?: string;
	role: Role;
}

export interface ILoginDTO {
	email: string;
	password: string;
}

export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	role: Role;
}

export interface IConfig {
	port: number;
	secret_key: string;
	token_expiration: number;
	nodeEnv: string;
	jwtSecretKey: string;
	jwtRefreshSecretKey: string;
	frontendUrl?: string;
}

export interface IBaseEntity {
	id: string;
}

export interface IBusinessUserPreview {
	id: string;
	email: string;
	fullName: string;
	phoneNumber: string;
	description: string | null;
}

export interface IQuery {
	page?: number;
	limit?: number;
}
