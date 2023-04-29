import { NextFunction, Request, Response } from 'express';
import { CreateCourseInput, DeleteCourseInput } from '../schemas/course.schema';
import {
  createCourse,
  getCourses,
  getCourse,
  deleteCourseById,
} from '../services/course.service';

export const createCourseHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateCourseInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await createCourse(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        id: course.generatedMaps[0].id,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getCoursesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await getCourses();
    res.status(200).json({
      status: 'success',
      data: {
        courses,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteCourseByIdHandler = async (
  req: Request<DeleteCourseInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.courseId;
    const course = await getCourse(Number(id));

    if (!course) {
      return res.status(404).json({
        status: 'failed',
        data: {
          message: 'Invalid Course Id',
        },
      });
    }

    await deleteCourseById(Number(id));

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: unknown) {
    return next(err);
  }
};
