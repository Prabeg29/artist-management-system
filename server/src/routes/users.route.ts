import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { authenticate } from '@middlewares/authenticate';
import { isSuperAdmin } from '@middlewares/isSuperAdmin';
import { UserService } from '@modules/user/user.service';
import { AuthService } from '@modules/auth/auth.service';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { UserController } from '@modules/user/user.controller';
import { signupSchema } from '@modules/auth/validations/signup.schema';
import { KnexUserRepository } from '@modules/user/knex-user.repository';

const router: Router = Router();
const userController = new UserController(
  new UserService(new KnexUserRepository(knex)),
  new AuthService(new KnexUserRepository(knex))
);

router.get('/', authenticate, isSuperAdmin, tryCatchWrapper(userController.index));
router.post('/', authenticate, isSuperAdmin, validate(signupSchema),tryCatchWrapper(userController.store));
router.get('/:id', authenticate, isSuperAdmin, tryCatchWrapper(userController.show));
router.put('/:id', authenticate, isSuperAdmin, validate(signupSchema), tryCatchWrapper(userController.update));
router.delete('/:id', authenticate, isSuperAdmin,tryCatchWrapper(userController.update));

export default router;
