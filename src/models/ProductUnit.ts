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

  declare price: number;

  declare purchasingPrice: number;

  declare duration: number;

  declare apiCode: number;

  declare available: boolean;

  declare type: string;

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

  purchasingPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: 'purchasing_price',
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  apiCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'api_code',
  },

  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,
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
