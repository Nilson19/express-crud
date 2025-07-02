import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories/UserRepository';
import { validatePassword } from '../utils/validations';
import { env } from './env';


export default function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await UserRepository.findByEmail(email);
        if (!user) return done(null, false, { message: 'No user found' });

        const isMatch = await validatePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwtSecret || 'mi_clave_super_secreta',
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserRepository.findByEmail(jwt_payload.email);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error('Error in JWT strategy:', err);
        return done(err, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserRepository.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
