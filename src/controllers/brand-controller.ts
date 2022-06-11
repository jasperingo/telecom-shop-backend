import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import DatabaseConnection from '../configs/database-config';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import BrandRepository from '../repositories/brand-repository';
import PhotoRepository from '../repositories/photo-repository';

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
  }
};

export default BrandController;
