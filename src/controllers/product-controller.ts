import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import ProductRepository from '../repositories/product-repository';
import PaginationService from '../services/pagination-service';

const ProductController = {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.product;

      req.body.id = id;

      await ProductRepository.update(req.body);

      const product = await ProductRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('Product updated', product));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  readOne(req: Request, res: Response) {
    res.status(statusCode.OK)
      .send(ResponseDTO.success('Product fetched', req.data.product));
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { product, count } = await ProductRepository.findAll();

      const pagination = PaginationService.getResponse(count, product, req);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Users fetched', { product, pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default ProductController;
