import { TypeOf, z } from 'zod';

enum SCORE {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export const createResultSchema = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student Id is required',
    }),
    courseId: z.string({
      required_error: 'Course Id is required',
    }),
    score: z.nativeEnum(SCORE),
  }),
});

export type CreateResultInput = TypeOf<typeof createResultSchema>['body'];
