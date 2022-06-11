import { Transaction } from 'sequelize';
import DatabaseConnection from '../configs/database-config';
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

  findAll() {
    return DatabaseConnection.transaction(async (transaction) => {
      const [brands, count] = await Promise.all([
        Brand.findAll({ transaction }),
        Brand.count({ transaction }),
      ]);

      return { brands, count };
    });
  },

  create({ name, apiCode }: Brand, transaction?: Transaction) {
    return Brand.create({ name, apiCode }, { transaction });
  },

  update({ id, name, apiCode }: Brand, transaction?: Transaction) {
    return Brand.update({ name, apiCode }, { where: { id }, transaction });
  },
};

export default BrandRepository;
