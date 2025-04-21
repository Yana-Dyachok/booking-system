import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload.type';
import { IConfig } from '@/common/types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<
				IConfig['jwtRefreshSecretKey']
			>('config.jwtRefreshSecretKey'),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: JwtPayload) {
		const header = req.get('authorization');
		if (!header) {
			throw new UnauthorizedException('Missing refresh token');
		}

		const refreshToken = header.replace('Bearer', '').trim();
		if (!refreshToken) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		return {
			...payload,
			refreshToken,
		};
	}
}
