import * as express from 'express';
import {
  createCourseHandler,
  deleteCourseByIdHandler,
  getCoursesHandler,
} from '../controllers/course.controller';
import {
  createCourseSchema,
  deleteCourseSchema,
} from '../schemas/course.schema';
import { validate } from '../middlewares/validator';

const router = express.Router();

router
  .route('/')
  .post(validate(createCourseSchema), createCourseHandler)
  .get(getCoursesHandler);

router
  .route('/:courseId')
  .delete(validate(deleteCourseSchema), deleteCourseByIdHandler);

export default router;
