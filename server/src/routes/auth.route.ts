import { Router } from 'express';

import { validate } from '../middlewares/validator';
import { UserService } from '../modules/user/user.service';
import { tryCatchWrapper } from '../utils/try-catch-wrapper';
import { AuthController } from '../modules/auth/auth.controller';
import { TenantService } from '../modules/tenants/tenant.service';
import { signinSchema, signupSchema } from '../modules/auth/auth.schema';
import { KnexUserRepository } from '../modules/user/knex-user.repository';
import { KnexTenantRepository } from '../modules/tenants/knex-tenant.repository';

const router: Router = Router();
const authController = new AuthController(
  new TenantService(new KnexTenantRepository()),
  new UserService(new KnexUserRepository()),
);

router.post('/signup', validate(signupSchema), tryCatchWrapper(authController.signup));
router.post('/signin', validate(signinSchema), tryCatchWrapper(authController.signin));

export default router;
