import { NextFunction, Request, Response} from 'express';

import { roles } from '@enums/roles.enum';
import { StatusCodes } from 'http-status-codes';
import { HttpException } from '@exceptions/http.exception';

export const isSuperAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  // const user = await (new KnexUserRepository(knex)).fetchOneById(req.user.);

  if (req.role !== roles.SUPER_ADMIN) {
    next(new HttpException('You are not authorized to view the resource', StatusCodes.FORBIDDEN));
  }

  next();
};