import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import Transaction from '../models/Transaction';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import TransactionRepository from '../repositories/transaction-repository';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';
import PaginationService from '../services/pagination-service';

const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = await HashService.hashPassword(req.body.password);

      const result = await UserRepository.create(req.body);

      const user = await UserRepository.findById(result.id);
  
      res.status(statusCode.CREATED).send(ResponseDTO.success('User created', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.user;

      req.body.id = id;

      await UserRepository.update(req.body);

      const user = await UserRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('User updated', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.user;

      const password = await HashService.hashPassword(req.body.newPassword);

      await UserRepository.updatePassword(id, password);

      const user = await UserRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('User password updated', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.user;

      await UserRepository.updateStatus(id, req.body.status);

      const user = await UserRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('User status updated', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.user;

      await UserRepository.updateAdmin(id, req.body.admin);

      const user = await UserRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('User admin updated', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  readOne(req: Request, res: Response) {
    res.status(statusCode.OK)
      .send(ResponseDTO.success('User fetched', req.data.user));
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageLimit, pageOffset } = PaginationService.getParams(req);

      const { users, count } = await UserRepository.findAll(pageOffset, pageLimit);

      const pagination = PaginationService.getResponse(page, pageLimit, count, users.length);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Users fetched', users, { pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async readReferrals(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageLimit, pageOffset } = PaginationService.getParams(req);

      const { users, count, } = await UserRepository.findAllByReferralId(
        req.data.user.id,
        pageOffset,
        pageLimit
      );

      const pagination = PaginationService.getResponse(page, pageLimit, count, users.length);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Referrals fetched', users, { pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async readTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageLimit, pageOffset } = PaginationService.getParams(req);

      const type = Transaction.getTypes().includes(req.query.type as string) 
        ? req.query.type as string 
        : undefined;

      const { transactions, count, } = await TransactionRepository.findAllByUserId(
        req.data.user.id,
        pageOffset,
        pageLimit,
        type,
      );

      const pagination = PaginationService.getResponse(page, pageLimit, count, transactions.length);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Transactions fetched', transactions, { pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async readTransactionsBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionsBalance = await TransactionRepository.sumAmountByUserIdAndStatus(req.data.user.id);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Transactions balance fetched', { transactionsBalance }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },
};

export default UserController;
