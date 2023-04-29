import { TypeOf, z } from 'zod';

const params = {
  params: z.object({
    studentId: z.string(),
  }),
};

function calculateAge(birthDate: Date) {
  const diffMseconds = Date.now() - birthDate.getTime();
  const ageDateTime = new Date(diffMseconds);
  return Math.abs(ageDateTime.getUTCFullYear() - 1970);
}

export const createStudentSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    familyName: z.string({
      required_error: 'Family name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Email is invalid',
      }),
    birthDate: z.coerce
      .date({
        required_error: 'Date of birth is required',
      })
      .refine(
        (date) => {
          return calculateAge(date) >= 10;
        },
        {
          message: 'Student must be at least 10 years old',
        }
      ),
  }),
});


export const deleteStudentSchema = z.object({ ...params });

export type CreateStudentInput = TypeOf<typeof createStudentSchema>['body'];
export type DeleteStudentInput = TypeOf<typeof deleteStudentSchema>['params'];
