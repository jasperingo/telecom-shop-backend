import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey } from 'sequelize';
import DatabaseConnection from '../configs/database-config';
import ProductUnit from './ProductUnit';
import User from './User';

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {

  declare id: CreationOptional<number>;

  declare userId: ForeignKey<User['id']>;

  declare user?: NonAttribute<User>;

  declare productUnitId: ForeignKey<ProductUnit['id']>;

  declare productUnit?: NonAttribute<ProductUnit>;

  declare reference: string;

  declare amount: number;

  declare type: string;

  declare status: string;

  declare recipientNumber: string;

  declare createdAt: CreationOptional<Date>;

  static readonly TYPE_DEPOSIT = 'deposit';

  static readonly TYPE_PAYMENT = 'payment';

  static readonly STATUS_CREATED = 'created';

  static readonly STATUS_PENDING = 'pending';

  static readonly STATUS_FAILED = 'failed';

  static readonly STATUS_APPROVED = 'approved';

  static getTypes() {
    return [
      Transaction.TYPE_DEPOSIT,
      Transaction.TYPE_PAYMENT,
    ];
  }

  static getStatuses() {
    return [
      Transaction.STATUS_APPROVED,
      Transaction.STATUS_CREATED,
      Transaction.STATUS_FAILED,
      Transaction.STATUS_PENDING,
    ];
  }
}

Transaction.init({

  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM(...Transaction.getTypes()),
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM(...Transaction.getStatuses()),
    allowNull: false,
  },

  recipientNumber: {
    type: DataTypes.STRING,
    field: 'recipient_number',
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  }

},
{
  tableName: 'transactions',
  modelName: 'transaction',
  sequelize: DatabaseConnection,
});

const uForeignKey = {
  name: 'userId',
  field: 'user_id',
  type: DataTypes.INTEGER
};

User.hasMany(Transaction, { foreignKey: uForeignKey });

Transaction.belongsTo(User, { foreignKey: uForeignKey });

const pForeignKey = {
  name: 'productUnitId',
  field: 'product_unit_id',
  type: DataTypes.INTEGER
};

ProductUnit.hasMany(Transaction, { foreignKey: pForeignKey, as: 'productUnit' });

Transaction.belongsTo(ProductUnit, { foreignKey: pForeignKey, as: 'productUnit' });


export default Transaction;
