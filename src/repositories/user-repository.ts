import User from '../models/User';

const UserRepository = {

  async existsByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user !== null;
  },

  async existsByPhoneNumber(phoneNumber: string) {
    const user = await User.findOne({ where: { phoneNumber } });
    return user !== null;
  },

  findById(id: number) {
    return User.findByPk(id);
  },

  create({ firstName, lastName, email, phoneNumber, password }: User) {
    return User.create({ 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password, 
      admin: false,
      status: User.STATUS_ACTIVATED, 
    });
  },

};

export default UserRepository;
