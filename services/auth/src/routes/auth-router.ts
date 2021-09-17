import { AuthScope, requireAuth, validateRequest } from '@tstores/common';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import * as controller from '../controllers/auth-controller';
const router = Router();
router.post(
  '/sign-in',
  [
    body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('password').trim().notEmpty().withMessage('Password can not be empty'),
  ],
  validateRequest,
  controller.signIn
);
router.post(
  '/sign-up',
  [
    body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password can not be empty'),
  ],
  validateRequest,
  controller.signUp
);
router.post('/sign-out', requireAuth([AuthScope.Public]), controller.signOut);
router.post('/refresh-token', controller.refreshToken);
router.post(
  '/verify-otp',
  [
    body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('otp code must be at 6 chars long'),
  ],
  validateRequest,
  controller.verifyOTP
);

router.get('/check-auth', requireAuth(), (req: Request, res: Response) => {
  const currentUser = req.currentUser;
  res.json({ currentUser });
});
export { router as AuthRouter };
