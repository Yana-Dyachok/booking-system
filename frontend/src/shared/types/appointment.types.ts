import { IUser } from './user.types';
import { Dayjs } from 'dayjs';

export interface IAppointment {
  date: string;
  time: string;
  durationMin: number;
}

export interface IAppointmentInput {
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

export interface IAppointmentRequest extends IAppointment {
  businessId: string;
}

export interface IAppointmentResponse {
  id: string;
  date: Date;
  endDate?: Date;
  durationMin: number;
  clientId: string;
  businessId: string;
  client: IUser;
  business: IUser;
  createdAt: Date;
}
