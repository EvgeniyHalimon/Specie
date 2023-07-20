import express, { Response, Request } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';

import { CustomRequest } from '../../shared/types/types';

import { authorizationService } from './authorization.service';
import { ITokens } from './types';
import { loginSchema } from './validators/loginSchema';
import { registerSchema } from './validators/registerSchema';

const router = express.Router();

router.post('/login', validate(loginSchema, {}, {}), async (req: any, res: Response) => {
  try {
    const token: ITokens = await authorizationService.login(req?.user || req.body);
    if(!token){
      res.json({ message: 'Pending Account. Please Verify Your Email!' });
    }
    // Send authorization roles and access token to username
    res.json({ refreshToken: token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', validate(registerSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    await authorizationService.register(req.body);
    res.status(201).json({ 
      success: `New user ${req.body.firstname} ${req.body.lastname} created!`, 
      message: 'User was registered successfully! Please check your email', 
    });
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/refresh', async (req: CustomRequest, res: Response) => {
  try {
    const token: ITokens = await authorizationService.refreshToken(Number(req.id));
    res.json({ refreshToken: token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

router.get('/confirm/:confirmationCode', async (req: Request, res: Response) => {
  try {
    await authorizationService.verifyUser(req.params.confirmationCode);
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] },
  ));

router.get('/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  }),
);

router.get('/protected', isLoggedIn, async (req: any, res) => {
  try {
    const token: ITokens = await authorizationService.loginWithGoogle(req?.user);
    // Send authorization roles and access token to username
    res.json({ refreshToken: token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.get('/logout', (req: any, res) => {
  res.redirect('/auth');
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


export default router;