import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

  declare id: CreationOptional<number>;

  declare name: string;

  declare description: string;

  declare available: boolean;

  declare createdAt: CreationOptional<Date>;

  static readonly TYPE_DATA = 1;

  static readonly TYPE_AIRTIME = 2;

  static readonly TYPE_CABLE = 3;

  static readonly TYPE_ELECTRICITY = 4;
}

Product.init({

  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
  },

  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  }

},
{
  tableName: 'products',
  modelName: 'product',
  sequelize: DatabaseConnection,
});

export default Product;
