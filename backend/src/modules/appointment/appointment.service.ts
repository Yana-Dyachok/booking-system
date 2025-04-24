import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma-orm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(clientId: string, dto: CreateAppointmentDto) {
		const startDate = new Date(`${dto.date}T${dto.time}:00`);
		const endDate = new Date(
			startDate.getTime() + dto.durationMin * 60 * 1000,
		);
		const business = await this.prisma.user.findUnique({
			where: { id: dto.businessId },
		});

		if (!business) {
			throw new NotFoundException('Business with this ID not found');
		}
		const overlapping = await this.prisma.appointment.findFirst({
			where: {
				businessId: dto.businessId,
				AND: [
					{ date: { lt: endDate } },
					{ endDate: { gt: startDate } },
				],
			},
		});

		if (overlapping) {
			throw new BadRequestException(
				'Appointment already exists for this business at the specified time',
			);
		}
		const appointment = await this.prisma.appointment.create({
			data: {
				businessId: dto.businessId,
				clientId,
				date: startDate,
				endDate,
				durationMin: dto.durationMin,
			},
		});

		return appointment;
	}

	async findClientAppointments(clientId: string) {
		return this.prisma.appointment.findMany({
			where: { clientId },
			include: {
				business: {
					select: {
						fullName: true,
						email: true,
						phoneNumber: true,
					},
				},
			},
		});
	}

	async delete(id: string) {
		return this.prisma.appointment.delete({ where: { id } });
	}

	async update(id: string, dto: UpdateAppointmentDto) {
		const appointment = await this.prisma.appointment.findUnique({
			where: { id },
		});

		if (!appointment) {
			throw new NotFoundException('Appointment not found');
		}

		const date = dto.date ?? appointment.date.toISOString().split('T')[0];
		const time =
			dto.time ??
			appointment.date.toISOString().split('T')[1].slice(0, 5);
		const durationMin = dto.durationMin ?? appointment.durationMin;

		const startDate = new Date(`${date}T${time}:00`);
		const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000);
		const overlapping = await this.prisma.appointment.findFirst({
			where: {
				businessId: appointment.businessId,
				id: { not: id },
				AND: [
					{ date: { lt: endDate } },
					{ endDate: { gt: startDate } },
				],
			},
		});

		if (overlapping) {
			throw new BadRequestException(
				'Appointment already exists for this business at the specified time',
			);
		}

		return this.prisma.appointment.update({
			where: { id },
			data: {
				date: startDate,
				endDate,
				durationMin,
			},
		});
	}
}
