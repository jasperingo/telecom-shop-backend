import express from 'express';
import ProductController from '../controllers/product-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import ProductFetchMiddleware from '../middlewares/fetch/product-fetch-middleware';
import ProductUpdatePermissionMiddleware from '../middlewares/permissions/product/product-update-permission-middleware';
import ProductUpdateValidatorMiddleware from '../middlewares/validators/product/product-update-validator-middleware';

const ProductRouter = express.Router();

ProductRouter.put(
  '/:id',
  ProductFetchMiddleware,
  JwtAuthMiddleware,
  ProductUpdatePermissionMiddleware,
  ProductUpdateValidatorMiddleware,
  ProductController.update.bind(ProductController)
);

ProductRouter.get(
  '/:id',
  ProductFetchMiddleware,
  ProductController.readOne.bind(ProductController)
);

ProductRouter.get(
  '',
  ProductController.read.bind(ProductController)
);

export default ProductRouter;
