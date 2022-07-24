import Product from '../models/Product';
import DatabaseConnection from '../configs/database-config';
import Brand from '../models/Brand';
import Photo from '../models/Photo';
import ProductUnit from '../models/ProductUnit';

const ProductUnitRepository = {
  async existsById(id: number) {
    const unit = await ProductUnit.findByPk(id);
    return unit !== null;
  },

  findById(id: number) {
    return ProductUnit.findByPk(id, {
      include: [
        {
          model: Brand,
          include: [
            { model: Photo }
          ]
        },
        {
          model: Product,
        }
      ]
    });
  },

  findAll() {
    return DatabaseConnection.transaction(async (transaction) => {
      const [productUnits, count] = await Promise.all([
        ProductUnit.findAll({ 
          include: [
            {
              model: Brand,
              include: [
                { model: Photo }
              ],
            },
            {
              model: Product,
            },
          ],
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
          include: [
            {
              model: Brand,
              include: [
                { model: Photo }
              ],
            },
            {
              model: Product,
            }
          ], 
          transaction,
        }),
        ProductUnit.count({ where: { productId }, transaction }),
      ]);

      return { productUnits, count };
    });
  },

  create({ name, apiCode, brandId, productId, price, duration, available, type, purchasingPrice }: ProductUnit) {
    return ProductUnit.create({ name, apiCode, brandId, productId, price, duration, available, type, purchasingPrice });
  },

  update({ id, name, apiCode, brandId, price, duration, available, purchasingPrice }: ProductUnit) {
    return ProductUnit.update(
      { name, apiCode, brandId, price, duration, available, purchasingPrice },
      { where: { id } }
    );
  },
};

export default ProductUnitRepository;
