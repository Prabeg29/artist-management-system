import { Router } from 'express';

import authRoute from './auth.route';
import usersRoute from './users.route';
import artistsRoute from './artists.route';

const router: Router = Router();

router.get('/ping', (_req, res) => res.json({ message: 'pong'}));
router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/artists', artistsRoute);

export default router;
