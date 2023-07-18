import dotenv from 'dotenv';
import express, { Response, Request } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { CustomRequest, IGoogleUser } from '../../shared/types/types';

import { userRepository } from '../users/users.repository';
import { userService } from '../users/users.service';

import { authorizationService } from './authorization.service';
import { ITokens } from './types';

import { loginSchema } from './validators/loginSchema';
import { registerSchema } from './validators/registerSchema';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res: Response) => {
    const token: ITokens = authorizationService.generateAccessToken(req.user);
    res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken });
  },
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

//four test routes
router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/protected', isLoggedIn, (req: any, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

router.get('/logout', (req: any, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

router.post('/login', validate(loginSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    const token: ITokens = await authorizationService.login(req.body);
    // Send authorization roles and access token to username
    res.json({ refreshToken: token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', validate(registerSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    await authorizationService.register(req.body);
    res.status(201).json({ 'success': `New user ${req.body.firstname} ${req.body.lastname} created!` });
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

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback',
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleID = profile.id;
      const email = profile.emails[0].value;
      const firstname = profile.name.givenName;
      const lastname = profile.name.familyName;
      const source = 'google';

      const currentUser = await userService.checkIfUserExist(email) as IGoogleUser;

      if (!currentUser) {
        const newUser = await userRepository.createNewUserWithGoogle({
          googleID,
          email,
          firstname,
          lastname,
          source,
        });
        return done(null, newUser);
      }

      if (currentUser.source != 'google') {
        //return error
        return done(null, false, {
          message: 'You have previously signed up with a different signin method',
        });
      }

      return done(null, currentUser);
    },
  ));

passport.serializeUser(function (user, done) {
  console.log('🚀 ~ file: authorization.controller.ts:64 ~ user:', user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default router;