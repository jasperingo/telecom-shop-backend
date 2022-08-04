import express from 'express';
import AnalysisController from '../controllers/analysis-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import AnalysisReadPermissionMiddleware from '../middlewares/permissions/analysis/analysis-read-permission-middleware';

const AnalysisRouter = express.Router();

AnalysisRouter.get(
  '',
  JwtAuthMiddleware,
  AnalysisReadPermissionMiddleware,
  AnalysisController.read.bind(AnalysisController)
);

export default AnalysisRouter;
