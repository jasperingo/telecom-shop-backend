import DatabaseConnection from '../configs/database-config';
import Brand from '../models/Brand';
import Photo from '../models/Photo';
import ProductUnit from '../models/ProductUnit';

const ProductUnitRepository = {
  findById(id: number) {
    return ProductUnit.findByPk(id, {
      include: {
        model: Brand,
        include: [
          { model: Photo }
        ]
      },
    });
  },

  findAll() {
    return DatabaseConnection.transaction(async (transaction) => {
      const [productUnits, count] = await Promise.all([
        ProductUnit.findAll({ 
          include: {
            model: Brand,
            include: [
              { model: Photo }
            ],
          }, 
          transaction,
        }),
        ProductUnit.count({ transaction }),
      ]);

      return { productUnits, count };
    });
  },

  findAllByProductId(productId: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [productUnits, count] = await Promise.all([
        ProductUnit.findAll({ 
          where: { productId },
          include: {
            model: Brand,
            include: [
              { model: Photo }
            ],
          }, 
          transaction,
        }),
        ProductUnit.count({ where: { productId }, transaction }),
      ]);

      return { productUnits, count };
    });
  },

  create({ name, apiCode, brandId, productId, price, duration, available }: ProductUnit) {
    return ProductUnit.create({ name, apiCode, brandId, productId, price, duration, available });
  },

  update({ id, name, apiCode, brandId, price, duration, available }: ProductUnit) {
    return ProductUnit.update(
      { name, apiCode, brandId, price, duration, available },
      { where: { id } }
    );
  },
};

export default ProductUnitRepository;
