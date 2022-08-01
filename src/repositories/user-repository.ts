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

  async existsByPasswordResetToken(passwordResetToken: string) {
    const user = await User.findOne({ where: { passwordResetToken } });
    return user !== null;
  },

  findById(id: number) {
    return User.findByPk(id, { 
      include: {
        model: User,
        as: 'referral',
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber'],
      },
    });
  },

  findByEmail(email: string) {
    return User.findOne({ 
      where: { email },
      include: {
        model: User,
        as: 'referral',
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber'],
      },
    });
  },

  findByPasswordResetToken(passwordResetToken: string) {
    return User.findOne({ where: { passwordResetToken } });
  },

  findAll(offset: number, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [users, count] = await Promise.all([
        User.findAll({ 
          limit, 
          offset,
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        User.count({ transaction }),
      ]);

      return { users, count };
    });
  },

  findAllByReferralId(referralId: number, offset: number, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [users, count] = await Promise.all([
        User.findAll({ 
          attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'createdAt'],
          where: { referralId }, 
          limit, 
          offset,
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        User.count({ 
          where: { referralId }, 
          transaction 
        }),
      ]);

      return { users, count };
    });
  },

  create({ firstName, lastName, email, phoneNumber, password, referralId }: User) {
    return User.create({ 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password, 
      referralId,
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

  updatePasswordResetToken(id: number, passwordResetToken: string | null) {
    return User.update({ passwordResetToken }, { where: { id } });
  },
};

export default UserRepository;
