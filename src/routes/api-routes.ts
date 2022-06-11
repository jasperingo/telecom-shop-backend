import express from 'express';
import AuthRouter from './auth-routes';
import BrandRouter from './brand-routes';
import PhotoRouter from './photo-routes';
import ProductRouter from './product-routes';
import UserRoutes from './user-routes';

const ApiRoutes = express.Router();

ApiRoutes.use('/users', UserRoutes);

ApiRoutes.use('/auth', AuthRouter);

ApiRoutes.use('/products', ProductRouter);

ApiRoutes.use('/photos', PhotoRouter);

ApiRoutes.use('/brands', BrandRouter);

export default ApiRoutes;
