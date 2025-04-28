import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';

export const createDateValidationSchema = () =>
  yup
    .mixed<Dayjs>()
    .nullable()
    .required('Date is required')
    .test(
      'is-valid',
      'Invalid date',
      (value) => value == null || dayjs(value).isValid(),
    )
    .test('is-not-past-day', 'Date cannot be in the past', (value) => {
      return value ? !value.isBefore(dayjs(), 'day') : false;
    });

export const createTimeValidationSchema = (selectedDate: Dayjs | null) =>
  yup
    .mixed<Dayjs>()
    .nullable()
    .required('Time is required')
    .test(
      'is-valid',
      'Invalid time',
      (value) => value == null || dayjs(value).isValid(),
    )
    .test('is-future', 'Time cannot be in the past', (value) => {
      if (!value || !selectedDate) {
        return true;
      }

      const now = dayjs();
      const isToday = selectedDate.isSame(now, 'day');

      if (isToday) {
        const selectedTime = selectedDate
          .clone()
          .hour(value.hour())
          .minute(value.minute())
          .second(0)
          .millisecond(0);
        const nowTime = now.clone().second(0).millisecond(0);
        return selectedTime.isAfter(nowTime);
      }

      return true;
    });

export const schemaMakeAppointment: yup.ObjectSchema<{
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}> = yup
  .object({
    date: createDateValidationSchema(),
    startTime: yup
      .mixed<Dayjs>()
      .nullable()
      .required('Start time is required')
      .test(
        'is-valid',
        'Invalid start time',
        (value) => value == null || dayjs(value).isValid(),
      )
      .test(
        'is-future-start',
        'Start time cannot be in the past',
        function (value) {
          return createTimeValidationSchema(this.parent.date).isValidSync(
            value,
          );
        },
      ),
    endTime: yup
      .mixed<Dayjs>()
      .nullable()
      .required('End time is required')
      .test(
        'is-valid',
        'Invalid end time',
        (value) => value == null || dayjs(value).isValid(),
      )
      .test(
        'is-future-end',
        'End time cannot be in the past',
        function (value) {
          return createTimeValidationSchema(this.parent.date).isValidSync(
            value,
          );
        },
      ),
  })
  .test('valid-time', 'Start time cannot be later than end time', (value) => {
    if (value.startTime && value.endTime) {
      return value.startTime.isBefore(value.endTime);
    }
    return true;
  });
