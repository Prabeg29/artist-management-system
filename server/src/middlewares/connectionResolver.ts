import { AsyncLocalStorage } from 'async_hooks';

import { NextFunction, Request, Response } from 'express';

import { getConnection } from '../utils/db.util';

export const asyncLocalStorage = new AsyncLocalStorage();

export const connectionResolver = async (req: Request, _res: Response, next: NextFunction) => {
  asyncLocalStorage.run(getConnection(req.subdomains[0]), () => {
    next();
  });
};
