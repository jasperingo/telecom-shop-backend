import DatabaseConnection from '../configs/database-config';
import Product from '../models/Product';

const ProductRepository = {
  async existsById(id: number) {
    const product = await Product.findByPk(id);
    return product !== null;
  },

  async existsByName(name: string) {
    const product = await Product.findOne({ where: { name } });
    return product !== null;
  },

  findById(id: number) {
    return Product.findByPk(id);
  },

  findAll() {
    return DatabaseConnection.transaction(async (transaction) => {
      const [products, count] = await Promise.all([
        Product.findAll({ transaction }),
        Product.count({ transaction }),
      ]);

      return { products, count };
    });
  },

  countAll() {
    return Product.count();
  },

  update({ id, name, description, available }: Product) {
    return Product.update(
      { name, description, available }, 
      { where: { id } }
    );
  },
};

export default ProductRepository;
