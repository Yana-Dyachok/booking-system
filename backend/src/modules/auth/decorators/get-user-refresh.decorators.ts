import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';

export const GetUserRefresh = createParamDecorator(
	(
		data: 'sub' | 'refreshToken' | undefined,
		ctx: ExecutionContext,
	): string | object | undefined => {
		const request = ctx.switchToHttp().getRequest();

		if (data === 'refreshToken') {
			const header = request.headers['authorization'];
			if (!header || typeof header !== 'string') {
				throw new UnauthorizedException('Missing refresh token');
			}

			const token = header.replace('Bearer', '').trim();
			if (!token) {
				throw new UnauthorizedException('Invalid refresh token');
			}

			return token;
		}

		if (data === 'sub') {
			return request.user?.sub as string | undefined;
		}

		return request.user;
	},
);
