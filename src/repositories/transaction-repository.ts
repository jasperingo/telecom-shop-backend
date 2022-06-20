import Brand from '../models/Brand';
import Photo from '../models/Photo';
import ProductUnit from '../models/ProductUnit';
import Transaction from '../models/Transaction';
import User from '../models/User';

const TransactionRepository = {
  async existsByReference(reference: string) {
    const transaction = await Transaction.findOne({ where: { reference } });
    return transaction !== null;
  },

  findById(id: number) {
    return Transaction.findByPk(id, {
      include: [
        {
          model: ProductUnit,
          as: 'productUnit',
          include: [
            {
              model: Brand,
              include: [
                { model: Photo }
              ]
            }
          ],
        },
        {
          model: User
        }
      ]
    });
  },

  create({ amount, recipientNumber, reference, status, type, userId, productUnitId }: Transaction) {
    return Transaction.create({ amount, recipientNumber, reference, status, type, userId, productUnitId });
  },

  updateStatus(id: number, status: string) {
    return Transaction.update({ status }, { where: { id } });
  },

  updateStatusByReference(reference: string, status: string) {
    return Transaction.update({ status }, { where: { reference } });
  }
};

export default TransactionRepository;
