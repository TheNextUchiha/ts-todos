import { Router } from 'express';
import { logIn, signUp } from '../controllers/authentication.js';
const router = Router();
router.post('/sign-up', signUp);
router.post('/log-in', logIn);
export default router;
