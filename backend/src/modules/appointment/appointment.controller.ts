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

@UseGuards(AtGuard, RolesGuard)
@Controller('appointments')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Post()
	@Roles(Role.CLIENT)
	create(
		@Body() dto: CreateAppointmentDto,
		@GetCurrentUserId() id: string,
	): Promise<Appointment> {
		return this.appointmentService.create(id, dto);
	}

	@Get('client')
	@Roles(Role.CLIENT)
	getClientAppointments(
		@GetCurrentUserId() id: string,
		@Query() query: QueryDto,
	): Promise<{ items: Appointment[]; total: number }> {
		return this.appointmentService.findClientAppointments(id, query);
	}

	@Get(':id')
	@Roles(Role.CLIENT)
	getAppointmentById(@Param('id') id: string): Promise<Appointment> {
		return this.appointmentService.findAppointmentById(id);
	}

	@Delete(':id')
	@Roles(Role.CLIENT)
	delete(@Param('id') id: string): Promise<Appointment> {
		return this.appointmentService.delete(id);
	}

	@Put(':id')
	@Roles(Role.CLIENT)
	update(
		@Param('id') id: string,
		@Body() dto: CreateAppointmentDto,
	): Promise<Appointment> {
		return this.appointmentService.update(id, dto);
	}
}
