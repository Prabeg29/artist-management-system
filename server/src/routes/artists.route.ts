import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { authenticate } from '@middlewares/authenticate';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { ArtistService } from '@modules/artists/artist.service';
import { ArtistController } from '@modules/artists/artist.controller';
import { KnexArtistRepository } from '@modules/artists/knex-artist.repository';
import { isSuperAdminOrArtistManager } from '@middlewares/isSuperAdminOrArtistManager';
import { CreateArtistSchema } from '@modules/artists/validations/create-artist.schema';
import { UpdateArtistSchema } from '@modules/artists/validations/update-artist.schema';

const router: Router = Router();
const artistController = new ArtistController(new ArtistService(new KnexArtistRepository(knex)));

router.get('/', authenticate, isSuperAdminOrArtistManager, tryCatchWrapper(artistController.index));
router.post(
  '/', 
  authenticate, 
  isSuperAdminOrArtistManager, 
  validate(CreateArtistSchema), 
  tryCatchWrapper(artistController.store)
);
router.get('/:id', authenticate, isSuperAdminOrArtistManager, tryCatchWrapper(artistController.show));
router.patch(
  '/:id', 
  authenticate, 
  isSuperAdminOrArtistManager, 
  validate(UpdateArtistSchema), 
  tryCatchWrapper(artistController.update)
);
router.delete('/:id', authenticate, isSuperAdminOrArtistManager, tryCatchWrapper(artistController.destroy));

export default router;
