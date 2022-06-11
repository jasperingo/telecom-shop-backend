import express from 'express';
import BrandController from '../controllers/brand-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import BrandCreatePermissionMiddleware from '../middlewares/permissions/brand/brand-create-permission-middleware';
import BrandCreateValidatorMiddleware from '../middlewares/validators/brand/brand-create-validator-middleware';

const BrandRouter = express.Router();

BrandRouter.post(
  '',
  JwtAuthMiddleware,
  BrandCreatePermissionMiddleware,
  BrandCreateValidatorMiddleware,
  BrandController.create.bind(BrandController)
);

export default BrandRouter;
