import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma-orm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { QueryDto } from './dto/query-appointment';
import { Appointment } from 'prisma/prisma/generated/client';
import { convertUtcToKyivTime } from '@/common/utils/convert-time.utils';

@Injectable()
export class AppointmentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		clientId: string,
		dto: CreateAppointmentDto,
	): Promise<Appointment> {
		if (!dto.date || !dto.time) {
			throw new BadRequestException('Date and time must be provided');
		}

		const [year, month, day] = dto.date.split('-').map(Number);
		const [hour, minute] = dto.time.split(':').map(Number);

		const startDate = new Date(year, month - 1, day, hour, minute);

		if (isNaN(startDate.getTime())) {
			throw new BadRequestException('Invalid date or time format');
		}

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

	async findClientAppointments(
		clientId: string,
		query: QueryDto,
	): Promise<{ items: Appointment[]; total: number }> {
		const { page = 1, limit = 10 } = query;
		const skip = (Number(page) - 1) * Number(limit);
		const take = Number(limit);

		try {
			const [items, total] = await this.prisma.$transaction([
				this.prisma.appointment.findMany({
					where: { clientId },
					skip,
					take,
					include: {
						business: {
							select: {
								fullName: true,
								email: true,
								phoneNumber: true,
							},
						},
					},
				}),
				this.prisma.appointment.count({ where: { clientId } }),
			]);

			console.log('Items count:', items.length);
			console.log('Total count:', total);
			const convertedItems = items.map((appointment) => {
				const convertedDate = convertUtcToKyivTime(appointment.date);
				return {
					...appointment,
					date: new Date(convertedDate.date),
				};
			});

			return { items: convertedItems, total };
		} catch (error) {
			console.error('Error fetching client appointments:', error);
			throw error;
		}
	}

	async findAppointmentById(id: string): Promise<Appointment> {
		const appointment = await this.prisma.appointment.findUnique({
			where: { id },
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

		if (!appointment) {
			throw new NotFoundException('Appointment not found');
		}

		const convertedDate = convertUtcToKyivTime(appointment.date);
		return {
			...appointment,
			date: new Date(convertedDate.date),
		};
	}

	async delete(id: string): Promise<Appointment> {
		const appointment = await this.prisma.appointment.findUnique({
			where: { id },
		});

		if (!appointment) {
			throw new NotFoundException('Appointment not found');
		}

		return this.prisma.appointment.delete({
			where: { id },
		});
	}

	async update(id: string, dto: UpdateAppointmentDto): Promise<Appointment> {
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

		const [year, month, day] = date.split('-').map(Number);
		const [hour, minute] = time.split(':').map(Number);

		const startDate = new Date(year, month - 1, day, hour, minute);
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
