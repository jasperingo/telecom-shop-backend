import LocalStrategy from 'passport-local';
import JwtStrategy from 'passport-jwt';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';
import type { JWTPayload } from '../services/jwt-service';

export const PasswordAuth = new LocalStrategy.Strategy({ usernameField: 'email' }, 
  async (email, password, done) => {
    try {
      const user = await UserRepository.findByEmail(email);

      if (
        user === null ||
        ! (await HashService.comparePassword(password, user.password))
      ) { 
        done(null, false);  
      } else {
        done(null, user);
      }
      
    } catch(error) {
      done(error);
    }
  }
);

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const JwtAuth = new JwtStrategy.Strategy(opts, async (jwtPayload: JWTPayload, done) => {
  try {
    const user = await UserRepository.findById(jwtPayload.sub as number);

    if (user === null) { 
      done(null, false);  
    } else {
      done(null, user);
    }
    
  } catch(error) {
    done(error);
  }
});
