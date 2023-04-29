import { Course } from '../entities/Course';
import { getDataSource } from '../data-source';

async function getCourseRepository() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Course);
}

export const createCourse = async (data: Partial<Course>) => {
  const courseRepo = await getCourseRepository();
  return courseRepo.insert({ ...data });
};

export const getCourses = async () => {
  const courseRepo = await getCourseRepository();
  return courseRepo.find();
};

export const getCourse = async (id: number) => {
  const courseRepo = await getCourseRepository();
  return courseRepo.findOne({ where: { id } });
};

export const deleteCourseById = async (id: number) => {
  const courseRepo = await getCourseRepository();
  return courseRepo.delete({ id });
};
