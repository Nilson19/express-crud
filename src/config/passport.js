import { Strategy as LocalStrategy } from 'passport-local';
import ValidationUtils from '../utils/validations';
import { findOne, findById } from '../models/User';

export default function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      // Buscar usuario por email
      const user = await findOne({ email });
      if (!user) return done(null, false, { message: 'No user found' });

      // Comparar contraseñas
      const isMatch = await ValidationUtils.validatePassword(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    findById(id, (err, user) => done(err, user));
  });
};
