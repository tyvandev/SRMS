export const calculateStudentBirthDate = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};
