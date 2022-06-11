import express from 'express';
import ProductUnitController from '../controllers/product-unit-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import ProductUnitCreatePermissionMiddleware from '../middlewares/permissions/product-unit/product-unit-create-permission-middleware';
import ProductUnitCreateValidatorMiddleware from '../middlewares/validators/product-unit/product-unit-create-validator-middleware';

const ProductUnitRouter = express.Router();

ProductUnitRouter.post(
  '',
  JwtAuthMiddleware,
  ProductUnitCreatePermissionMiddleware,
  ProductUnitCreateValidatorMiddleware,
  ProductUnitController.create.bind(ProductUnitController)
);

export default ProductUnitRouter;
