import {
	Controller,
	Get,
	Param,
	Put,
	Delete,
	Body,
	UseGuards,
	Post,
	Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AtGuard } from '../auth';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { GetCurrentUserId } from '../auth/decorators';
import { Role, Appointment } from '../../../prisma/prisma/generated/client';
import { QueryDto } from './dto/query-appointment';

@Controller('appointments')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Post()
	@Roles(Role.CLIENT)
	@UseGuards(AtGuard, RolesGuard)
	create(
		@Body() dto: CreateAppointmentDto,
		@GetCurrentUserId() id: string,
	): Promise<Appointment> {
		return this.appointmentService.create(id, dto);
	}

	@Get(':id/client')
	@Roles(Role.CLIENT)
	@UseGuards(RolesGuard)
	getClientAppointments(
		@Param('id') id: string,
		@Query() query: QueryDto,
	): Promise<{ items: Appointment[]; total: number }> {
		return this.appointmentService.findClientAppointments(id, query);
	}

	@Delete(':id')
	@Roles(Role.CLIENT)
	@UseGuards(AtGuard, RolesGuard)
	delete(@Param('id') id: string): Promise<Appointment> {
		return this.appointmentService.delete(id);
	}

	@Put(':id')
	@Roles(Role.CLIENT)
	@UseGuards(AtGuard, RolesGuard)
	update(
		@Param('id') id: string,
		@Body() dto: CreateAppointmentDto,
	): Promise<Appointment> {
		return this.appointmentService.update(id, dto);
	}
}
