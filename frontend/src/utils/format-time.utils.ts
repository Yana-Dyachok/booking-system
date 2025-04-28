export const formatTime = (dateInput: string | Date): string => {
  const createdAtDate =
    typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const hours = String(createdAtDate.getHours()).padStart(2, '0');
  const minutes = String(createdAtDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
