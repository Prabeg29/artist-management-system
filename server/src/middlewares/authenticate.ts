/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response} from 'express';

import config from '@config';
import { HttpException } from '@exceptions/http.exception';

interface CustomRequest extends Request {
  id?: number;
}

export const authenticate = (req: CustomRequest, _res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new HttpException('No token provided', 400);
  }

  const decoded: any = jwt.verify(req.headers.authorization, config.secrets.jwt);
  req.id = decoded.userId;

  next();
};