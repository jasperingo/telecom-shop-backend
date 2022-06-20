import { WhereOptions } from 'sequelize';
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

  findAll(cursor: WhereOptions<Transaction>, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [tx, count] = await Promise.all([
        Transaction.findAll({ 
          where: cursor, 
          limit, 
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        Transaction.count({ transaction }),
      ]);

      return { transactions: tx, count };
    });
  },

  findAllByUserId(userId: number, cursor: WhereOptions<Transaction>, limit: number) {
    return DatabaseConnection.transaction(async (transaction) => {
      const [tx, count] = await Promise.all([
        Transaction.findAll({ 
          where: { userId, ...cursor }, 
          limit, 
          order: [['createdAt', 'DESC']], 
          transaction,
        }),

        Transaction.count({ transaction }),
      ]);

      return { transactions: tx, count };
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
