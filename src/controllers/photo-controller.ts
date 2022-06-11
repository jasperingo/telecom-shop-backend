import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import statusCode from 'http-status';
import path from 'path';
import { promisify } from 'util';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import Photo from '../models/Photo';
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
  },

  async update(req: Request, res: Response, next: NextFunction){ 
    try {

      const { id } = req.data.photo;

      const file = req.file as Express.Multer.File;

      await PhotoRepository.update({
        id,
        name: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      } as any);
      
      await promisify(fs.unlink)(
        path.join(process.cwd(), Photo.UPLOAD_DIRECTORY, req.data.photo.name)
      );

      const photo = await PhotoRepository.findById(id);

      res.status(statusCode.OK).send(ResponseDTO.success('Photo updated', photo));

    } catch (error) {
      next(InternalServerError(error));
    }
  }
};

export default PhotoController;
