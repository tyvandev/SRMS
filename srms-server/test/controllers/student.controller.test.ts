import request from 'supertest';
import { applistener } from '../../src/index';
import { closeDataSource } from '../../src/data-source';
import {
  createStudent,
  deleteStudentById,
} from '../../src/services/student.service';
import { calculateStudentBirthDate } from '../utils';

const birthDate = calculateStudentBirthDate(new Date(), 15);

afterAll(async () => {
  await closeDataSource();
  applistener.close();
});

describe('Students endpoints', () => {
  describe('Create Student', () => {
    it('should not create a student with invalid request body', async () => {
      const res = await request(applistener).post('/api/v1/students').send({});

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'First name is required' })
      );
    });

    it('should not create a student with invalid email', async () => {
      const res = await request(applistener).post('/api/v1/students').send({
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaaexample.com',
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'Email is invalid' })
      );
    });

    it('should not create a student less than 10 years old', async () => {
      const res = await request(applistener)
        .post('/api/v1/students')
        .send({
          firstName: 'John',
          familyName: 'Doe',
          birthDate: calculateStudentBirthDate(new Date(), 9),
          email: 'kenaa@example.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({
          message: 'Student must be at least 10 years old',
        })
      );
    });

    it('should create a student', async () => {
      const res = await request(applistener).post('/api/v1/students').send({
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaa@example.com',
      });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual({ id: 1 });
    });
  });

  describe('getStudents', () => {
    let studentId: number;

    beforeAll(async () => {
      const studentData = {
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaa@example.com',
      };
      const student = await createStudent(studentData);
      studentId = student.generatedMaps[0].id;
    });
    afterAll(async () => {
      await deleteStudentById(studentId);
    });

    it('should get all students', async () => {
      const res = await request(applistener).get('/api/v1/students');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.students).toContainEqual(
        expect.objectContaining({ id: studentId })
      );
    });
  });

  describe('deleteStudent', () => {
    let studentId: number;

    beforeAll(async () => {
      const studentData = {
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaa@example.com',
      };
      const student = await createStudent(studentData);
      studentId = student.generatedMaps[0].id;
    });
    it('should delete a students', async () => {
      const res = await request(applistener).delete(
        `/api/v1/students/${studentId}`
      );
      expect(res.status).toBe(204);
    });

    it('should not delete an invalid student record', async () => {
      const res = await request(applistener).delete(
        `/api/v1/students/${studentId}`
      );

      expect(res.status).toBe(404);
      expect(res.body.data.message).toBe('Invalid Student Id');
    });
  });
});
