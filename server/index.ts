import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import env from '@config';
import authRouter from '@apis/auth/controller';
import workspaceRouter from '@apis/workspace/controller';
import userRouter from '@apis/user/controller';
import errorHandler from '@middlewares/error-handler';
import cors from '@middlewares/cors';

const app = express();
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET_KEY));
app.use(cors());

app.get('/', (req: Request, res: Response) => res.send('Express'));
app.use('/auth', authRouter);
app.use('/workspace', workspaceRouter);
app.use('/user', userRouter);

app.use(errorHandler);

app.listen(8080);
