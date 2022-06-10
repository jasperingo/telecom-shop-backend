import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

  declare id: CreationOptional<number>;

  declare firstName: string;

  declare lastName: string;

  declare email: string;

  declare phoneNumber: string;

  declare password: string;

  declare status: string;

  declare admin: boolean;

  declare adminRole: string | null;

  declare createdAt: CreationOptional<Date>;

  static STATUS_ACTIVATED = 'activated';

  static STATUS_DEACTIVATED = 'deactivated';

  static ADMIN_ROLE_SUB = 'sub';

  static ADMIN_ROLE_SUPER = 'super';

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

export default User;
