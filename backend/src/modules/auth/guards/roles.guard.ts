import {
	Injectable,
	CanActivate,
	ExecutionContext,
	SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../types/jwt-payload.type';
import { Role } from '../../../../prisma/prisma/generated/client';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			'roles',
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user as JwtPayload;

		if (!user || !user.role) {
			return false;
		}

		return requiredRoles.some((role) => user.role === role);
	}
}
