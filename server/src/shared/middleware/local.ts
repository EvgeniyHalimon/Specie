import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { userService } from '../../modules/users/users.service';

passport.use(new LocalStrategy(
  async function (email, password, done) {
    console.log('LOCAL');
    const currentUser = await userService.checkIfUserExist(email);

    if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (currentUser.source != 'local') {
      return done(null, false, { message: 'You have previously signed up with a different signin method' });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: 'Incorrect password provided' });
    }
    return done(null, currentUser);
  },
));