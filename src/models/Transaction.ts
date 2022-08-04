import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey } from 'sequelize';
import DatabaseConnection from '../configs/database-config';
import ProductUnit from './ProductUnit';
import User from './User';

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {

  declare id: CreationOptional<number>;

  declare userId: ForeignKey<User['id']>;

  declare user?: NonAttribute<User>;

  declare productUnitId: ForeignKey<ProductUnit['id']> | null;

  declare productUnit?: NonAttribute<ProductUnit> | null;

  declare referralId: ForeignKey<User['id']> | null;

  declare referral?: NonAttribute<User> | null;

  declare reference: string;

  declare amount: number;

  declare fee: number;

  declare type: string;

  declare status: string;

  declare recipientNumber: string | null;

  declare depositMethod: string | null;

  declare createdAt: CreationOptional<Date>;

  declare total: CreationOptional<number>;

  static readonly TYPE_DEPOSIT = 'deposit';

  static readonly TYPE_BONUS = 'bonus';

  static readonly TYPE_PAYMENT = 'payment';

  static readonly STATUS_CREATED = 'created';

  static readonly STATUS_PENDING = 'pending';

  static readonly STATUS_FAILED = 'failed';

  static readonly STATUS_APPROVED = 'approved';

  static readonly DEPOSIT_METHOD_DIRECT = 'direct';

  static readonly DEPOSIT_METHOD_PAYSTACK = 'paystack';

  static readonly PAYSTACK_FEE = { threshold: 2500, min: 1.6, max: 3.7 };

  static readonly MINIMIUM_DEPOSIT_AMOUNT = 500.00;

  static readonly REFERENCE_LENGTH = 10;

  static getTypes() {
    return [
      Transaction.TYPE_DEPOSIT,
      Transaction.TYPE_PAYMENT,
      Transaction.TYPE_BONUS,
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

  static getDepositMethods() {
    return [
      Transaction.DEPOSIT_METHOD_DIRECT,
      Transaction.DEPOSIT_METHOD_PAYSTACK,
    ];
  }

  static getPaystackFee(amount: number) {
    const fee = amount <= Transaction.PAYSTACK_FEE.threshold 
      ? ((amount * Transaction.PAYSTACK_FEE.min) / 100).toFixed(2)
      : ((amount * Transaction.PAYSTACK_FEE.max) / 100).toFixed(2);

    return Number(fee);
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
    type: DataTypes.DOUBLE,
    allowNull: false,
  },

  fee: { 
    type: DataTypes.DOUBLE,
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

  depositMethod: {
    type: DataTypes.ENUM(...Transaction.getDepositMethods()),
    field: 'deposit_method',
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },

  total: {
    type: DataTypes.VIRTUAL,
    get() {
      const fee = this.getDataValue('fee');
      const amount = this.getDataValue('amount');
      return amount + fee;
    }
  },
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

const rForeignKey = {
  name: 'referralId',
  field: 'referral_id',
  type: DataTypes.INTEGER
};

User.hasMany(Transaction, { foreignKey: rForeignKey });

Transaction.belongsTo(User, { foreignKey: rForeignKey, as: 'referral' });

export default Transaction;
