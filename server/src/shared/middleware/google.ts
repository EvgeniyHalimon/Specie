import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { userRepository } from '../../modules/users/users.repository';
import { IGoogleUser } from '../types/types';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('GOOGLE');
      const googleID = profile.id;
      const email = profile.emails[0].value;
      const firstname = profile.name.givenName;
      const lastname = profile.name.familyName;
      const source = 'google';
  
      const currentUser = await userRepository.findUser(email) as IGoogleUser;
  
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