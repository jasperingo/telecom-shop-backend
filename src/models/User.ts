import { Model, DataTypes } from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class User extends Model {

  static STATUS_ACTIVATED = 'activated';

  static STATUS_DEACTIVATED = 'deactivated';

  static getStatuses() {
    return [
      User.STATUS_ACTIVATED,
      User.STATUS_DEACTIVATED
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
