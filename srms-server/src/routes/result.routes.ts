import * as express from 'express';
import {
  createResultHandler,
  getResultsHandler,
} from '../controllers/result.controller';
import { createResultSchema } from '../schemas/result.schema';
import { validate } from '../middlewares/validator';

const router = express.Router();

router
  .route('/')
  .post(validate(createResultSchema), createResultHandler)
  .get(getResultsHandler);

export default router;
