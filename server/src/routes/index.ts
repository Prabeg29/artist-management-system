import { Router } from 'express';

import authRoute from './auth.route';
import usersRoute from './users.route';

const router: Router = Router();

router.get('/ping', (_req, res) => res.json({ message: 'pong'}));
router.use('/auth', authRoute);
router.use('/users', usersRoute);

export default router;
