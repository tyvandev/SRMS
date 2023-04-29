import * as express from 'express';
import {
  createStudentHandler,
  deleteStudentByIdHandler,
  getStudentsHandler,
} from '../controllers/student.controller';
import {
  createStudentSchema,
  deleteStudentSchema,
} from '../schemas/student.schema';
import { validate } from '../middlewares/validator';

const router = express.Router();

router
  .route('/')
  .post(validate(createStudentSchema), createStudentHandler)
  .get(getStudentsHandler);

router
  .route('/:studentId')
  .delete(validate(deleteStudentSchema), deleteStudentByIdHandler);

export default router;
