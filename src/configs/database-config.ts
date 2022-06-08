import { Sequelize, Dialect } from 'sequelize';

const DatabaseConnection = new Sequelize(
  process.env.DATABASE_NAME as string, 
  process.env.DATABASE_USER as string, 
  process.env.DATABASE_PASSWORD as string, 
  {
    host: process.env.DATABASE_HOST as string,
    dialect: process.env.DATABASE_DIALECT as Dialect,
    logging(msg) {
      if (process.env.NODE_ENV === 'development') {
        console.log(msg);
      }
    },
    define: {
      timestamps: false,
    }
  }
);

(async () => {
  try {
    await DatabaseConnection.authenticate();
    console.log('DATABASE CONNECTED');
  } catch (err) {
    console.error('DATABASE NOT CONNECTED', err);
  }
})();

export default DatabaseConnection;
