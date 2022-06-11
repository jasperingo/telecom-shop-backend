import express from 'express';
import BrandController from '../controllers/brand-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import BrandFetchMiddleware from '../middlewares/fetch/brand-fetch-middleware';
import BrandCreatePermissionMiddleware from '../middlewares/permissions/brand/brand-create-permission-middleware';
import BrandReadOnePermissionMiddleware from '../middlewares/permissions/brand/brand-read-one-permission-middleware';
import BrandReadPermissionMiddleware from '../middlewares/permissions/brand/brand-read-permission-middleware';
import BrandUpdatePermissionMiddleware from '../middlewares/permissions/brand/brand-update-permission-middleware';
import BrandCreateValidatorMiddleware from '../middlewares/validators/brand/brand-create-validator-middleware';
import BrandUpdateValidatorMiddleware from '../middlewares/validators/brand/brand-update-validator-middleware';

const BrandRouter = express.Router();

BrandRouter.post(
  '',
  JwtAuthMiddleware,
  BrandCreatePermissionMiddleware,
  BrandCreateValidatorMiddleware,
  BrandController.create.bind(BrandController)
);

BrandRouter.put(
  '/:id',
  BrandFetchMiddleware,
  JwtAuthMiddleware,
  BrandUpdatePermissionMiddleware,
  BrandUpdateValidatorMiddleware,
  BrandController.update.bind(BrandController)
);

BrandRouter.get(
  '', 
  JwtAuthMiddleware,
  BrandReadPermissionMiddleware,
  BrandController.read.bind(BrandController)
);

BrandRouter.get(
  '/:id', 
  BrandFetchMiddleware,
  JwtAuthMiddleware,
  BrandReadOnePermissionMiddleware,
  BrandController.readOne.bind(BrandController)
);

export default BrandRouter;
