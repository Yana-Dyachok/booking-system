import {
	Injectable,
	CanActivate,
	ExecutionContext,
	mixin,
	Type,
	SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../types/jwt-payload.type';
import { Role } from '.prisma/client';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export function RolesGuard(): Type<CanActivate> {
	@Injectable()
	class RolesGuard implements CanActivate {
		constructor(private reflector: Reflector) {}

		canActivate(context: ExecutionContext): boolean {
			const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
				'roles',
				[context.getHandler(), context.getClass()],
			);

			if (!requiredRoles || requiredRoles.length === 0) {
				return true;
			}

			const request = context.switchToHttp().getRequest();
			const user = request.user as JwtPayload;

			if (!user || !user.role) {
				return false;
			}

			return requiredRoles.includes(user.role);
		}
	}

	return mixin(RolesGuard);
}
