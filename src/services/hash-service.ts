import * as bcrypt from 'bcrypt';

const HashService = {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },

  comparePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  },
};

export default HashService;
