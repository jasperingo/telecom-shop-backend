import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import DatabaseConnection from '../configs/database-config';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import BrandRepository from '../repositories/brand-repository';
import PhotoRepository from '../repositories/photo-repository';
import PaginationService from '../services/pagination-service';

const BrandController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const result = await DatabaseConnection.transaction(async (transaction) => {
        const newBrand = await BrandRepository.create(req.body, transaction);
        await PhotoRepository.updateBrand(req.body.photoId, newBrand.id, transaction);
        return newBrand;
      });

      const brand = await BrandRepository.findById(result.id);

      res.status(statusCode.CREATED).send(ResponseDTO.success('Brand created', brand));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.brand;

      req.body.id = id;

      await DatabaseConnection.transaction((transaction) => {
        return Promise.all([
          BrandRepository.update(req.body, transaction),

          req.body.photoId !== undefined
            ? PhotoRepository.updateBrand(req.body.photoId, id, transaction)
            : null,
        ]);
      });

      const brand = await BrandRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('Brand updated', brand));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  readOne(req: Request, res: Response) {
    res.status(statusCode.OK)
      .send(ResponseDTO.success('Brand fetched', req.data.brand));
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { brands, count } = await BrandRepository.findAll();

      const pagination = PaginationService.getResponse(count, brands, req);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Brands fetched', brands, { pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default BrandController;
