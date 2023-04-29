import { TypeOf, z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const params = {
  params: z.object({
    courseId: z.string(),
  }),
};

export const deleteCourseSchema = z.object({ ...params });

export type CreateCourseInput = TypeOf<typeof createCourseSchema>['body'];
export type DeleteCourseInput = TypeOf<typeof deleteCourseSchema>['params'];
