import { Result } from '../entities/Result';
import { getDataSource } from '../data-source';

async function getResultRepository() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Result);
}

export const createResult = async (data: Partial<Result>) => {
  const resultRepo = await getResultRepository();
  return resultRepo.insert({ ...data });
};

export const getResults = async () => {
  const resultRepo = await getResultRepository();
  return resultRepo.find({ relations: { student: true, course: true } });
};
