import { NextFunction, Request, Response } from 'express';
import { CreateResultInput } from '../schemas/result.schema';
import { createResult, getResults } from '../services/result.service';
import { Result } from '../entities/Result';

export const createResultHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateResultInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: Partial<Result> = {
      ...req.body,
      studentId: Number(req.body.studentId),
      courseId: Number(req.body.courseId),
    };
    const result = await createResult(data);
    res.status(201).json({
      status: 'success',
      data: {
        id: result.generatedMaps[0].id,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getResultsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await getResults();
    res.status(200).json({
      status: 'success',
      data: {
        results,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};
