import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { AuthService } from '@modules/auth/auth.service';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { AuthController } from '@modules/auth/auth.controller';
import { signinSchema } from '@modules/auth/validations/signin.schema';
import { signupSchema } from '@modules/auth/validations/signup.schema';
import { KnexUserRepository } from '@modules/user/knex-user.repository';

const router: Router = Router();
const authController = new AuthController(new AuthService(new KnexUserRepository(knex)));

router.post('/signup', validate(signupSchema), tryCatchWrapper(authController.signup));
router.post('/signin', validate(signinSchema), tryCatchWrapper(authController.signin));

export default router;
