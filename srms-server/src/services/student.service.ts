import { Student } from '../entities/Student';
import { getDataSource } from '../data-source';

async function getStudentRepository() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Student);
}

export const createStudent = async (data: Partial<Student>) => {
  const studentRepo = await getStudentRepository();
  return studentRepo.insert({ ...data });
};

export const getStudents = async () => {
  const studentRepo = await getStudentRepository();
  return studentRepo.find();
};

export const getStudent = async (id: number) => {
  const studentRepo = await getStudentRepository();
  return studentRepo.findOne({ where: { id } });
};

export const deleteStudentById = async (id: number) => {
  const studentRepo = await getStudentRepository();
  return studentRepo.delete({ id });
};
