import path from 'path';
import multer from 'multer';
import createHttpError from 'http-errors';
import StringGeneratorService from '../../services/string-generator-service';
import PhotoRepository from '../../repositories/photo-repository';

const PhotoUploadMiddleware = multer({ 
  storage: multer.diskStorage({
    
    destination(req, file, cb) {
      cb(null, './public/images');
    },
  
    async filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      try {
        const name = await StringGeneratorService.generate(
          (prefix) => PhotoRepository.existsByName(`${prefix}${ext}`)
        );

        if (name === undefined) {
          throw new createHttpError.InternalServerError();
        }

        cb(null, `${name}${ext}`);
      } catch (error) {
        cb(error as any, '');
      }
    }
  }),
}).single('photo');

export default PhotoUploadMiddleware;
