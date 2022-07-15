import { 
  Model, 
  DataTypes, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey, 
  NonAttribute 
} from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

  declare id: CreationOptional<number>;

  declare referralId: ForeignKey<User['id']>;

  declare referral?: NonAttribute<User>;

  declare firstName: string;

  declare lastName: string;

  declare email: string;

  declare phoneNumber: string;

  declare password: string;

  declare status: string;

  declare admin: boolean;

  declare adminRole: string | null;

  declare passwordResetToken: CreationOptional<string | null>;

  declare createdAt: CreationOptional<Date>;

  static readonly STATUS_ACTIVATED = 'activated';

  static readonly STATUS_DEACTIVATED = 'deactivated';

  static readonly ADMIN_ROLE_SUB = 'sub';

  static readonly ADMIN_ROLE_SUPER = 'super';

  static readonly PASSWORD_RESET_TOKEN_LENGTH = 6;

  static getStatuses() {
    return [
      User.STATUS_ACTIVATED,
      User.STATUS_DEACTIVATED,
    ];
  }

  static getAdminRoles() {
    return [
      User.ADMIN_ROLE_SUB,
      User.ADMIN_ROLE_SUPER,
    ];
  }
}

User.init({

  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'phone_number'
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(...User.getStatuses()),
    allowNull: false,
  },

  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  adminRole: {
    type: DataTypes.ENUM(...User.getAdminRoles()),
    field: 'admin_role',
  },

  passwordResetToken: {
    type: DataTypes.STRING,
    field: 'password_reset_token',
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  }

},
{
  tableName: 'users',
  modelName: 'user',
  sequelize: DatabaseConnection,
});

const foreignKey = {
  name: 'referralId',
  field: 'referral_id',
  type: DataTypes.INTEGER
};

User.hasMany(User, { foreignKey });

User.belongsTo(User, { foreignKey, as: 'referral' });

export default User;
