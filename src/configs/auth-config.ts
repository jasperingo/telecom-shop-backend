import LocalStrategy from 'passport-local';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';

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
