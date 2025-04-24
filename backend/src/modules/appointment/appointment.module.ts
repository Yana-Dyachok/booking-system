import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { PrismaModule } from '../prisma-orm';
import { AppointmentController } from './appointment.controller';

@Module({
	imports: [PrismaModule],
	providers: [AppointmentService],
	exports: [AppointmentService],
	controllers: [AppointmentController],
})
export class AppointmentModule {}
