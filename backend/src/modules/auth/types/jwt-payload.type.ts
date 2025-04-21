import { Role } from '../../../../prisma/prisma/generated/client';

export type JwtPayload = {
	sub: string;
	email: string;
	role: Role;
};
