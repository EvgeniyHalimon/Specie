import passport from 'passport';

import { userService } from '../../modules/users/users.service';

passport.serializeUser((user, done) => {
    console.log('PASSPORT S')
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('PASSPORT DS')
    const currentUser = await userService.findByID(id);
    done(null, currentUser);
});