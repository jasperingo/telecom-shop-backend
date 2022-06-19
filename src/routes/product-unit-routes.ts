import express from 'express';
import ProductUnitController from '../controllers/product-unit-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import ProductUnitFetchMiddleware from '../middlewares/fetch/product-unit-fetch-middleware';
import ProductUnitCreatePermissionMiddleware from '../middlewares/permissions/product-unit/product-unit-create-permission-middleware';
import ProductUnitUpdatePermissionMiddleware from '../middlewares/permissions/product-unit/product-unit-update-permission-middleware';
import ProductUnitCreateValidatorMiddleware from '../middlewares/validators/product-unit/product-unit-create-validator-middleware';
import ProductUnitUpdateValidatorMiddleware from '../middlewares/validators/product-unit/product-unit-update-validator-middleware';

const ProductUnitRouter = express.Router();

ProductUnitRouter.post(
  '',
  JwtAuthMiddleware,
  ProductUnitCreatePermissionMiddleware,
  ProductUnitCreateValidatorMiddleware,
  ProductUnitController.create.bind(ProductUnitController)
);

ProductUnitRouter.put(
  '/:id',
  ProductUnitFetchMiddleware,
  JwtAuthMiddleware,
  ProductUnitUpdatePermissionMiddleware,
  ProductUnitUpdateValidatorMiddleware,
  ProductUnitController.update.bind(ProductUnitController)
);

ProductUnitRouter.get(
  '/:id',
  ProductUnitFetchMiddleware,
  ProductUnitController.readOne.bind(ProductUnitController)
);

export default ProductUnitRouter;
