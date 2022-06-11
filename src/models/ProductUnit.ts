import { 
  Model, 
  DataTypes, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey, 
  NonAttribute, 
} from 'sequelize';
import DatabaseConnection from '../configs/database-config';
import Brand from './Brand';
import Product from './Product';

class ProductUnit extends Model<InferAttributes<ProductUnit>, InferCreationAttributes<ProductUnit>> {

  declare id: CreationOptional<number>;

  declare brandId: ForeignKey<Brand['id']>;

  declare brand?: NonAttribute<Brand>;

  declare productId: ForeignKey<Product['id']>;

  declare product?: NonAttribute<Product>;

  declare name: string;

  declare price: string;

  declare duration: boolean;

  declare apiCode: string;

  declare available: boolean;

  declare createdAt: CreationOptional<Date>;
}

ProductUnit.init({

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

  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  apiCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'api_code',
  },

  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
},
{
  tableName: 'product_units',
  modelName: 'product_unit',
  sequelize: DatabaseConnection,
});

const pForeignKey = {
  name: 'productId',
  field: 'product_id',
  type: DataTypes.INTEGER
};

Product.hasMany(ProductUnit, { foreignKey: pForeignKey });

ProductUnit.belongsTo(Product, { foreignKey: pForeignKey });

const bForeignKey = {
  name: 'brandId',
  field: 'brand_id',
  type: DataTypes.INTEGER
};

Brand.hasMany(ProductUnit, { foreignKey: bForeignKey });

ProductUnit.belongsTo(Brand, { foreignKey: bForeignKey });

export default ProductUnit;
