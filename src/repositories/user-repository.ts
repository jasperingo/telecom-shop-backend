import { WhereOptions } from 'sequelize/types';
import DatabaseConnection from '../configs/database-config';
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

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  },

  findAll(cursor: WhereOptions<User>, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [users, count] = await Promise.all([
        User.findAll({ 
          where: cursor, 
          limit, 
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        User.count({ transaction }),
      ]);

      return { users, count };
    });
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

  update({ id, firstName, lastName, email, phoneNumber }: User) {
    return User.update(
      { 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
      }, 
      { where: { id } }
    );
  },

  updatePassword(id: number, password: string) {
    return User.update({ password }, { where: { id } });
  },

  updateStatus(id: number, status: string) {
    return User.update({ status }, { where: { id } });
  },

  updateAdmin(id: number, admin: boolean) {
    return User.update(
      { admin, adminRole: admin ? User.ADMIN_ROLE_SUB : null }, 
      { where: { id } }
    );
  },

};

export default UserRepository;
