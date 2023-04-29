import request from 'supertest';
import { applistener } from '../../src/index';
import { closeDataSource } from '../../src/data-source';
import {
  createCourse,
  deleteCourseById,
} from '../../src/services/course.service';
import {
  createStudent,
  deleteStudentById,
} from '../../src/services/student.service';
import { createResult } from '../../src/services/result.service';
import { calculateStudentBirthDate } from '../utils';

const birthDate = calculateStudentBirthDate(new Date(), 15);

afterAll(async () => {
  await closeDataSource();
  applistener.close();
});

describe('Results endpoints', () => {
  describe('Get Results', () => {
    let resultId: number;
    let studentId: number;
    let courseId: number;

    beforeAll(async () => {
      const studentData = {
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaa@example.com',
      };
      const student = await createStudent(studentData);
      studentId = student.generatedMaps[0].id;

      const course = await createCourse({ title: 'Biology' });
      courseId = course.generatedMaps[0].id;

      const resultData = {
        studentId,
        courseId,
        score: 'A',
      };
      const result = await createResult(resultData);
      resultId = result.generatedMaps[0].id;
    });

    afterAll(async () => {
      await deleteStudentById(studentId);
      await deleteCourseById(courseId);
    });

    it('should get all results', async () => {
      const res = await request(applistener).get('/api/v1/results');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.results.length).toEqual(1);
      expect(res.body.data.results).toContainEqual(
        expect.objectContaining({ id: resultId })
      );
    });
  });

  describe('Create Result', () => {
    let studentId: number;
    let courseId: number;

    beforeAll(async () => {
      const studentData = {
        firstName: 'John',
        familyName: 'Doe',
        birthDate,
        email: 'kenaa@example.com',
      };
      const student = await createStudent(studentData);
      studentId = student.generatedMaps[0].id;

      const course = await createCourse({ title: 'Biology' });
      courseId = course.generatedMaps[0].id;
    });

    afterAll(async () => {
      await deleteStudentById(studentId);
      await deleteCourseById(courseId);
    });

    it('should not create a result with empty request body', async () => {
      const res = await request(applistener).post('/api/v1/results').send({});

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'Student Id is required' })
      );
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'Course Id is required' })
      );
    });

    it('should not create a result with invalid score', async () => {
      const res = await request(applistener).post('/api/v1/results').send({
        studentId,
        courseId,
        score: 'Z',
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({
          message:
            "Invalid enum value. Expected 'A' | 'B' | 'C' | 'D' | 'E' | 'F', received 'Z'",
        })
      );
    });

    it('should create a result', async () => {
      const res = await request(applistener)
        .post('/api/v1/results')
        .send({
          studentId: String(studentId),
          courseId: String(courseId),
          score: 'A',
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual({ id: res.body.data.id });
    });
  });
});
