import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey } from 'sequelize';
import DatabaseConnection from '../configs/database-config';
import Brand from './Brand';

class Photo extends Model<InferAttributes<Photo>, InferCreationAttributes<Photo>> {

  declare id: CreationOptional<number>;

  declare brand_id: ForeignKey<Brand['id']> | null;

  declare brand?: NonAttribute<Brand>;

  declare name: string;

  declare mimetype: string;

  declare size: number;

  declare createdAt: CreationOptional<Date>;

  declare href: CreationOptional<string>;

  static readonly UPLOAD_DIRECTORY = './public/images';
}

Photo.init({

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

  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },

  href: {
    type: DataTypes.VIRTUAL,
    get() {
      const photoName = this.getDataValue('name');
      return `${process.env.SERVER_HOST}images/${photoName}`;
    }
  },
},
{
  tableName: 'photos',
  modelName: 'photo',
  sequelize: DatabaseConnection,
});

const foreignKey = {
  name: 'brand_id',
  type: DataTypes.INTEGER
};

Brand.hasOne(Photo, { foreignKey });

Photo.belongsTo(Brand, { foreignKey });

export default Photo;
