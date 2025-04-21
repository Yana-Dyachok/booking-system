export const formatDate = (dateString: string): string => {
  const createdAtDate = new Date(dateString);

  const day = String(createdAtDate.getDate()).padStart(2, '0');
  const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
  const year = createdAtDate.getFullYear();

  return `${day}.${month}.${year}`;
};
