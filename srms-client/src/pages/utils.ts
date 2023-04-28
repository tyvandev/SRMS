export const dateToString = (date: Date | string | null): string => {
  if (!date) return '';
  const newDate = new Date(date);

  return newDate.toISOString().split('T')[0];
}
