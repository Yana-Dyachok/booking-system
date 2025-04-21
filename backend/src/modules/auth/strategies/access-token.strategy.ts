import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload.type';
import { IConfig } from '@/common/types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<IConfig['jwtSecretKey']>(
				'config.jwtSecretKey',
			),
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
