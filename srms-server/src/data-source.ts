import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Student } from './entities/Student';
import { Course } from './entities/Course';
import { Result } from './entities/Result';

const mainConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: false,
  logging: false,
  entities: [Student, Course, Result],
  migrations: ['src/migrations/1682648054028-InitialMigration.ts'],
  migrationsRun: false,
  metadataTableName: 'typeorm-migrations',
  subscribers: [],
};

export const AppDataSource = new DataSource(mainConfig);

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource) {
    return dataSource;
  }

  dataSource = await AppDataSource.initialize();

  return dataSource;
}

export async function closeDataSource(): Promise<void> {
  if (dataSource) {
    await dataSource.destroy();

    dataSource = null;
  }
}
