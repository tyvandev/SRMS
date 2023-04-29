import request from 'supertest';
import { applistener } from '../../src/index';
import { closeDataSource } from '../../src/data-source';
import {
  createCourse,
  deleteCourseById,
} from '../../src/services/course.service';

afterAll(async () => {
  await closeDataSource();
  applistener.close();
});

describe('Course endpoints', () => {
  describe('Create Course', () => {
    it('should not create a course with empty request body', async () => {
      const res = await request(applistener).post('/api/v1/courses').send({});

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'Title is required' })
      );
    });

    it('should not create a course with invalid title', async () => {
      const res = await request(applistener).post('/api/v1/courses').send({
        title: 1,
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('failed');
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ message: 'Expected string, received number' })
      );
    });

    it('should create a course', async () => {
      const res = await request(applistener).post('/api/v1/courses').send({
        title: 'Chemistry',
      });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual({ id: res.body.data.id });
    });
  });

  describe('getCourses', () => {
    let courseId: number;

    beforeAll(async () => {
      const course = await createCourse({ title: 'English' });
      courseId = course.generatedMaps[0].id;
    });

    afterAll(async () => {
      await deleteCourseById(courseId);
    });

    it('should get all courses', async () => {
      const res = await request(applistener).get('/api/v1/courses');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.courses).toContainEqual(
        expect.objectContaining({ id: courseId })
      );
    });
  });

  describe('Delete Course', () => {
    let courseId: number;

    beforeAll(async () => {
      const course = await createCourse({ title: 'English' });
      courseId = course.generatedMaps[0].id;
    });

    it('should delete a course', async () => {
      const res = await request(applistener).delete(
        `/api/v1/courses/${courseId}`
      );
      expect(res.status).toBe(204);
    });

    it('should not delete an invalid course record', async () => {
      const res = await request(applistener).delete('/api/v1/courses/4');

      expect(res.status).toBe(404);
      expect(res.body.data.message).toBe('Invalid Course Id');
    });
  });
});
