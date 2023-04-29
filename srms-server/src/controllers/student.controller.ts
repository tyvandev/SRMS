import { NextFunction, Request, Response } from 'express';
import {
  CreateStudentInput,
  DeleteStudentInput,
} from '../schemas/student.schema';
import {
  createStudent,
  getStudents,
  deleteStudentById,
  getStudent,
} from '../services/student.service';

export const createStudentHandler = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    CreateStudentInput
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        id: student.generatedMaps[0].id,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getStudentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await getStudents();
    res.status(200).json({
      status: 'success',
      data: {
        students,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteStudentByIdHandler = async (
  req: Request<DeleteStudentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.studentId;
    const student = await getStudent(Number(id));

    if (!student) {
      return res.status(404).json({
        status: 'failed',
        data: {
          message: 'Invalid Student Id',
        },
      });
    }
    await deleteStudentById(Number(id));

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: unknown) {
    return next(err);
  }
};
