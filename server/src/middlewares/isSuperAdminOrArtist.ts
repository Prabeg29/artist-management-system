import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response} from 'express';

import { roles } from '../enums/roles.enum';
import { HttpException } from '../exceptions/http.exception';

export const isSuperAdminOrArtist = async (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser.role !== roles.ARTIST && req.currentUser.role !== roles.SUPER_ADMIN) {
    next(new HttpException('You are not authorized to view the resource', StatusCodes.FORBIDDEN));
  }

  next();
};