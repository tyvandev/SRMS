import express, { Request, Response } from 'express';
import cors from 'cors';
import studentRouter from './routes/student.routes';
import courseRouter from './routes/course.routes';
import resultRouter from './routes/result.routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/results', resultRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    reason: 'Not found',
  });
});

app.use((err: unknown, req: Request, res: Response) => {
  res.status(500).json({
    status: '500',
    reason: 'Erorr',
  });
});

export const applistener = app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
