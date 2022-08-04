import express from 'express';
import AuthRouter from './auth-routes';
import BrandRouter from './brand-routes';
import PhotoRouter from './photo-routes';
import ProductRouter from './product-routes';
import ProductUnitRouter from './product-unit-routes';
import TransactionRouter from './transaction-routes';
import AnalysisRouter from './analysis-routes';
import UserRoutes from './user-routes';

const ApiRoutes = express.Router();

ApiRoutes.use('/users', UserRoutes);

ApiRoutes.use('/auth', AuthRouter);

ApiRoutes.use('/products', ProductRouter);

ApiRoutes.use('/photos', PhotoRouter);

ApiRoutes.use('/brands', BrandRouter);

ApiRoutes.use('/product-units', ProductUnitRouter);

ApiRoutes.use('/transactions', TransactionRouter);

ApiRoutes.use('/analysis', AnalysisRouter);

export default ApiRoutes;
