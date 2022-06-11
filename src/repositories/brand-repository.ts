import { Transaction } from 'sequelize';
import Brand from '../models/Brand';
import Photo from '../models/Photo';

const BrandRepository = {
  async existsByName(name: string) {
    const brand = await Brand.findOne({ where: { name } });
    return brand !== null;
  },

  findById(id: number) {
    return Brand.findByPk(id, {
      include: {
        model: Photo
      }
    });
  },

  create({ name, apiCode }: Brand, transaction?: Transaction) {
    return Brand.create({ name, apiCode }, { transaction });
  },
};

export default BrandRepository;
