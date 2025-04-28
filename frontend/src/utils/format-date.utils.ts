export const formatDate = (dateInput: string | Date): string => {
  const createdAtDate =
    typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const day = String(createdAtDate.getDate()).padStart(2, '0');
  const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
  const year = createdAtDate.getFullYear();

  return `${day}.${month}.${year}`;
};
