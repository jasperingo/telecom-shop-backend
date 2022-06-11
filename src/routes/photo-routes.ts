import express from 'express';
import PhotoController from '../controllers/photo-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import PhotoFetchMiddleware from '../middlewares/fetch/photo-fetch-middleware';
import PhotoCreatePermissionMiddleware from '../middlewares/permissions/photo/photo-create-permission-middleware';
import PhotoUpdatePermissionMiddleware from '../middlewares/permissions/photo/photo-update-permission-middleware';
import PhotoUploadMiddleware from '../middlewares/utils/photo-upload-middleware';
import PhotoUploadValidatorMiddleware from '../middlewares/validators/photo/photo-upload-validation-middleware';

const PhotoRouter = express.Router();

PhotoRouter.post(
  '',
  JwtAuthMiddleware,
  PhotoCreatePermissionMiddleware,
  PhotoUploadMiddleware,
  PhotoUploadValidatorMiddleware,
  PhotoController.create.bind(PhotoController)
);

PhotoRouter.put(
  '/:id',
  PhotoFetchMiddleware,
  JwtAuthMiddleware,
  PhotoUpdatePermissionMiddleware,
  PhotoUploadMiddleware,
  PhotoUploadValidatorMiddleware,
  PhotoController.update.bind(PhotoController)
);

export default PhotoRouter;
