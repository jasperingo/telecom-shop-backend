import { Op } from 'sequelize';
import Product from '../models/Product';
import DatabaseConnection from '../configs/database-config';
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

  async sumAmountByUserIdAndStatus(userId: number, status = Transaction.STATUS_APPROVED) {
    const sum = await Transaction.sum('amount', { where: { userId, status } });
    return sum ?? 0;
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
            },
            {
              model: Product
            }
          ],
        },
        {
          model: User
        }
      ]
    });
  },

  findByReference(reference: string) {
    return Transaction.findOne({
      where: { reference },
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
            },
            {
              model: Product
            }
          ],
        },
        {
          model: User
        }
      ]
    });
  },

  findAll(offset: number, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [tx, count] = await Promise.all([
        Transaction.findAll({ 
          where: { status: { [Op.ne]: Transaction.STATUS_CREATED } }, 
          limit, 
          offset,
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        Transaction.count({ 
          where: { status: { [Op.ne]: Transaction.STATUS_CREATED } },
          transaction 
        }),
      ]);

      return { transactions: tx, count };
    });
  },

  findAllByUserId(userId: number, offset: number, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [tx, count] = await Promise.all([
        Transaction.findAll({ 
          where: { userId, status: { [Op.ne]: Transaction.STATUS_CREATED } }, 
          limit, 
          offset,
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        Transaction.count({ 
          where: { userId, status: { [Op.ne]: Transaction.STATUS_CREATED } }, 
          transaction 
        }),
      ]);

      return { transactions: tx, count };
    });
  },

  create(
    { amount, fee, recipientNumber, reference, status, type, userId, productUnitId, depositMethod }: 
    Pick<
      Transaction, 
      'reference' | 'recipientNumber' | 'amount' | 'fee' | 'userId' | 'status' | 'type' | 'productUnitId' | 'depositMethod'
    >
  ) {
    return Transaction.create({ amount, fee, recipientNumber, reference, status, type, userId, productUnitId, depositMethod });
  },

  updateStatus(id: number, status: string) {
    return Transaction.update({ status }, { where: { id } });
  },
};

export default TransactionRepository;
