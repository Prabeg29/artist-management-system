import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response} from 'express';

import { roles } from '../enums/roles.enum';
import { HttpException } from '../exceptions/http.exception';

export const isSuperAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.currentUser.role !== roles.SUPER_ADMIN) {
    next(new HttpException('You are not authorized to access the resource', StatusCodes.FORBIDDEN));
  }

  next();
};