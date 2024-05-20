import { Router } from 'express';

import { validate } from '../middlewares/validator';
import { authenticate } from '../middlewares/authenticate';
import { isSuperAdmin } from '../middlewares/isSuperAdmin';
import { UserService } from '../modules/user/user.service';
import { tryCatchWrapper } from '../utils/try-catch-wrapper';
import { UserController } from '../modules/user/user.controller';
import { ArtistService } from '../modules/artists/artist.service';
import { KnexUserRepository } from '../modules/user/knex-user.repository';
import { KnexArtistRepository } from '../modules/artists/knex-artist.repository';
import { createUserSchema } from '../modules/user/validations/create-user.schema';
import { updateUserSchema } from '../modules/user/validations/update-user.schema';

const router: Router = Router();
const userController = new UserController(
  new UserService(new KnexUserRepository()),
  new ArtistService(new KnexArtistRepository()),
);

router.get('/', authenticate, tryCatchWrapper(userController.index));
router.post('/', authenticate, isSuperAdmin, validate(createUserSchema), tryCatchWrapper(userController.store));
router.get('/:id', authenticate, isSuperAdmin, tryCatchWrapper(userController.show));
router.patch('/:id', authenticate, isSuperAdmin, validate(updateUserSchema), tryCatchWrapper(userController.update));
router.delete('/:id', authenticate, isSuperAdmin, tryCatchWrapper(userController.destroy));

export default router;
