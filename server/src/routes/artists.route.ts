import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { authenticate } from '@middlewares/authenticate';
import { SongService } from '@modules/songs/song.service';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { ArtistService } from '@modules/artists/artist.service';
import { ArtistController } from '@modules/artists/artist.controller';
import { KnexSongRepository } from '@modules/songs/knex-song.repository';
import { isSuperAdminOrArtist } from '@middlewares/isSuperAdminOrArtist';
import { ArtistSongController } from '@modules/songs/artist-song.controller';
import { KnexArtistRepository } from '@modules/artists/knex-artist.repository';
import { CreateSongSchema } from '@modules/songs/validations/create-song.schema';
import { UpdateSongSchema } from '@modules/songs/validations/update-song.schema';
import { CreateArtistSchema } from '@modules/artists/validations/create-artist.schema';
import { UpdateArtistSchema } from '@modules/artists/validations/update-artist.schema';
import { isSuperAdminOrArtistManager } from '@middlewares/isSuperAdminOrArtistManager';

const router: Router = Router();
const artistController = new ArtistController(new ArtistService(new KnexArtistRepository(knex)));
const artistSongController = new ArtistSongController(new SongService(new KnexSongRepository(knex)));

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

router.get('/:artistId/songs', authenticate, tryCatchWrapper(artistSongController.index));
router.post(
  '/:artistId/songs',
  authenticate,
  isSuperAdminOrArtist,
  validate(CreateSongSchema),
  tryCatchWrapper(artistSongController.store)
);
router.patch(
  '/:artistId/songs/:songId',
  authenticate,
  isSuperAdminOrArtist,
  validate(UpdateSongSchema),
  tryCatchWrapper(artistSongController.update)
);
router.delete(
  '/:artistId/songs/:songId',
  authenticate,
  isSuperAdminOrArtist,
  tryCatchWrapper(artistSongController.destroy)
);

export default router;
