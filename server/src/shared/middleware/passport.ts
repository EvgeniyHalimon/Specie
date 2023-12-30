import passport from 'passport';

import { userService } from '../../modules/users/users.service';

passport.serializeUser((user: any, done) => {
  console.log('PASSPORT S');
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log('PASSPORT DS');
  const currentUser = await userService.findByID(id as string);
  done(null, currentUser);
});