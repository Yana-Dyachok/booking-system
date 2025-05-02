export const formatDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  return date.toLocaleDateString('uk-UA', {
    timeZone: 'Europe/Kyiv',
  });
};
