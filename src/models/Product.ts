import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

  declare id: CreationOptional<number>;

  declare name: string;

  declare description: string;

  declare available: boolean;

  declare createdAt: CreationOptional<Date>;
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
