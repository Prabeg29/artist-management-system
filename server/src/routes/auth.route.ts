import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { UserService } from '@modules/user/user.service';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { AuthController } from '@modules/auth/auth.controller';
import { ArtistService } from '@modules/artists/artist.service';
import { signinSchema } from '@modules/auth/validations/signin.schema';
import { KnexUserRepository } from '@modules/user/knex-user.repository';
import { KnexArtistRepository } from '@modules/artists/knex-artist.repository';
import { createUserSchema } from '@modules/user/validations/create-user.schema';

const router: Router = Router();
const authController = new AuthController(
  new UserService(new KnexUserRepository(knex)),
  new ArtistService(new KnexArtistRepository(knex)),
);

router.post('/signup', validate(createUserSchema), tryCatchWrapper(authController.signup));
router.post('/signin', validate(signinSchema), tryCatchWrapper(authController.signin));

export default router;
