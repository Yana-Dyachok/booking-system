import {
	Controller,
	Get,
	Param,
	Put,
	Delete,
	Body,
	UseGuards,
	Post,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AtGuard } from '../auth';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { GetCurrentUserId } from '../auth/decorators';
import { Role, Appointment } from '../../../prisma/prisma/generated/client';

@UseGuards(AtGuard)
@Controller('appointments')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Post()
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard)
	create(
		@Body() dto: CreateAppointmentDto,
		@GetCurrentUserId() id: string,
	): Promise<Appointment> {
		return this.appointmentService.create(id, dto);
	}

	@Get('client')
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard)
	getClientAppointments(
		@GetCurrentUserId() id: string,
	): Promise<Appointment[]> {
		return this.appointmentService.findClientAppointments(id);
	}

	@Delete(':id')
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard)
	delete(@Param('id') id: string): Promise<Appointment> {
		return this.appointmentService.delete(id);
	}

	@Put(':id')
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard)
	update(
		@Param('id') id: string,
		@Body() dto: CreateAppointmentDto,
	): Promise<Appointment> {
		return this.appointmentService.update(id, dto);
	}
}
