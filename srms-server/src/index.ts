import express, { Request, Response } from 'express';
import cors from 'cors';
import courseRouter from './routes/course.routes';
const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/v1/courses', courseRouter);

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).send('Server Error');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export const applistener = app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
