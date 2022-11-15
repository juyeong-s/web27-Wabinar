import express, { Request, Response, NextFunction } from 'express';
import asyncWrapper from '@utils/async-wrapper';
import * as userService from './service';
import jwtAuthenticator from '@middlewares/jwt-authenticator';

const router = express.Router();

router.get(
  '/:id/workspace',
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const workspaces = await userService.getWorksapces(Number(id));

    res.send({ workspaces });
  }),
);

export default router;
