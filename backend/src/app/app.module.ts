import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../modules/prisma-orm';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '../common/config';
import { resolve } from 'path';
import { UserModule } from '@/modules/user';
import { AuthModule } from '@/modules/auth';
import { AppointmentModule } from '@/modules/appointment';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		UserModule,
		AppointmentModule,
		ConfigModule.forRoot({
			load: [envConfig],
			envFilePath: resolve(process.cwd(), '.env'),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
