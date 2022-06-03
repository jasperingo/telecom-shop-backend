import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import httpErrors from 'http-errors';
import ErrorHandler from './errors/error-handler';
import ApiRoutes from './routes/api-routes';

dotenv.config();

const app = express();

app.use(cors({ preflightContinue: true }));


app.get('/', (req, res) => {
  res.send('<h1>Welcome to royaltysubs REST API.</H1>');
});

app.use('/api', ApiRoutes);

app.use(function(req, res, next) {
  next(new httpErrors.NotFound('Resource could not be found'));
});

app.use(ErrorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at ${process.env.SERVER_HOST}:${ process.env.SERVER_PORT }`);
});
