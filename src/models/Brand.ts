import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import DatabaseConnection from '../configs/database-config';

class Brand extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {

  declare id: CreationOptional<number>;

  declare name: string;

  declare apiCode: number;

  declare createdAt: CreationOptional<Date>;
}

Brand.init({

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

  apiCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'api_code',
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  }

},
{
  tableName: 'brands',
  modelName: 'brand',
  sequelize: DatabaseConnection,
});

export default Brand;
