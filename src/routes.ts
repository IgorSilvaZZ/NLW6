import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { TagController } from './controllers/TagController';
import { ComplimentController } from './controllers/ComplimentController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticate';

const router = Router();

const userController = new UserController();
const tagController = new TagController();
const complimentController = new ComplimentController();
const authenticateUserController = new AuthenticateUserController();

router.post('/users', userController.handle);
router.post('/session', authenticateUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, tagController.handle);
router.post('/compliments', ensureAuthenticated, complimentController.handle);
router.get('/users/compliments/send', ensureAuthenticated, complimentController.listUserSenderCompliments);
router.get('/users/compliments/receive', ensureAuthenticated, complimentController.listUserReceiveCompliments);
router.get('/tags', tagController.listTags);
router.get('/users', ensureAuthenticated, userController.listUsers);

export { router }