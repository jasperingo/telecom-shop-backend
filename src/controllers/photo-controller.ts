import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import PhotoRepository from '../repositories/photo-repository';

const PhotoController = {
  async create(req: Request, res: Response, next: NextFunction){ 
    try {

      const file = req.file as Express.Multer.File;

      const result = await PhotoRepository.create({
        name: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      } as any);
      
      const photo = await PhotoRepository.findById(result.id);

      res.status(statusCode.CREATED).send(ResponseDTO.success('Photo created', photo));

    } catch (error) {
      next(InternalServerError(error));
    }
  }
};

export default PhotoController;
